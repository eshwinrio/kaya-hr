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
      const bearerToken = request.get('Authorization');
      if (!bearerToken) {
        throw httpErrors.Unauthorized('Missing access token');
      }

      const [, token] = bearerToken.split(' ');
      if (!validator.isJWT(token)) {
        throw httpErrors.Unauthorized('Invalid access token');
      }
      const accessTokenData = verifyAccessToken(token);
      response.locals.accessTokenData = accessTokenData;
      next();
    } catch (error) {
      next(error);
    }
  };
}
