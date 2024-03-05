import type { Users } from '@prisma/client';
import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import type { Locals as AccessTokenEnforcerLocals } from './require-access-token.js';

export type Locals<S extends boolean> =
  & AccessTokenEnforcerLocals
  & (S extends true ? Record<'user', Users> : Record<'user', Users | null>);
export type UserEnforcer<S extends boolean> = RequestHandler<unknown, unknown, unknown, unknown, Locals<S>>;

export default function<S extends boolean> (strict: S = true as S): UserEnforcer<S> {
  return async (_request, response, next) => {
    try {
      // Fetch the user using the access token from response locals
      const user = await prisma.users.findUnique({
        where: {
          email: response.locals.accessTokenData.email
        }
      });
      
      if (strict && !user) {
        throw httpErrors.Unauthorized('User not found');
      }
      response.locals.user = user;

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
