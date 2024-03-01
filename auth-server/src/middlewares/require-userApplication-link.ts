import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import prisma from '../lib/prisma.js';
import type { Locals as ApplicationEnforcerLocals } from './require-application.js';
import type { Locals as UserEnforcerLocals } from './require-user.js';

export type Locals = ApplicationEnforcerLocals & UserEnforcerLocals<true>;
export type UserApplicationLinkEnforcer = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export default function (): UserApplicationLinkEnforcer {
  return async (_request, response, next) => {
    try {
      const userApplicationMap = await prisma.userApplicationMap.findUnique({
        where: {
          userId_applicationId: {
            userId: response.locals.user.id,
            applicationId: response.locals.application.id
          }
        }
      });
      if (!userApplicationMap) {
        throw httpErrors.Unauthorized(`User is not authorized to use ${response.locals.application.name}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
