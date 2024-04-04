import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';
import validator from 'validator';
import { AccessTokenPayload, verifyAccessToken } from '../lib/token.js';
import type { Locals as RequireApplicationLocals } from './require-application.js';

export type Locals = RequireApplicationLocals & Record<'accessTokenData', AccessTokenPayload>;
export type AccessTokenEnforcer = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export default function (): AccessTokenEnforcer {
  return (request, response, next) => {
    try {
      const accessToken = request.cookies['access_token'];
      if (!accessToken) {
        throw httpErrors.Unauthorized('Missing access token');
      }
      if (!validator.isJWT(accessToken)) {
        throw httpErrors.Unauthorized(`Invalid access token: ${accessToken}`);
      }
      const accessTokenData = verifyAccessToken(accessToken);
      response.locals.accessTokenData = accessTokenData;
      next();
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        response.clearCookie('access_token');
        return next(httpErrors.Unauthorized('Access token expired'));
      }
      next(error);
    }
  };
}
