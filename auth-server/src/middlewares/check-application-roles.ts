import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import { Locals as ApplicationEnforcerLocals } from './require-application.js';
import { Locals as AccessTokenEnforcerLocals } from './require-access-token.js';
import prisma from '../lib/prisma.js';

type Locals = ApplicationEnforcerLocals & AccessTokenEnforcerLocals;
type ApplicationRoleEnforcer = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export default function (): ApplicationRoleEnforcer {
  return async (_request, response, next) => {
    try {
      const accessTokenData = response.locals.accessTokenData;
      const application = response.locals.application;

      const applicationRoles = await prisma.applicationRoleMappings.findMany({
        where: {
          applicationId: application.id,
          roleId: { in: accessTokenData.roles.map(role => role.id) }
        },
        include: {
          role: true
        }
      });

      if (!applicationRoles || applicationRoles.length === 0) {
        throw httpErrors.Unauthorized(`Application access restricted for ${accessTokenData.roles.map(role => role.title).join(', ')}`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
