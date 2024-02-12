import { ParamsDictionary } from 'express-serve-static-core';
import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import qs from 'qs';
import { AccessTokenPayload, verifyAccessToken } from '../lib/token.js';
import validator from 'validator';

type Locals = Record<'accessTokenData', AccessTokenPayload>;
type AccessTokenEnforcer = RequestHandler<ParamsDictionary, any, any, qs.ParsedQs, Locals>;

export default function (): AccessTokenEnforcer {
  return (request, response, next) => {
    try {
      const accessToken = request.cookies['access_token'];
      if (!accessToken) {
        throw httpErrors.Unauthorized('Missing access token');
      }
      if (!validator.isJWT(accessToken)) {
        throw httpErrors.Unauthorized('Invalid access token');
      }
      const accessTokenData = verifyAccessToken(accessToken);
      response.locals.accessTokenData = accessTokenData;
      next();
    } catch (error) {
      next(error);
    }
  };
}
