import { Applications } from '@prisma/client';
import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';
import validator from 'validator';
import prisma from '../lib/prisma.js';

export type Locals = Record<'application', Applications>;
export type ApplicationEnforcer = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export default function (): ApplicationEnforcer {
  return async (request, response, next) => {
    try {
      const applicationSecret = request.get('X-Application');
      if (!applicationSecret) {
        throw httpErrors.Unauthorized('Missing application secret');
      }

      if (!validator.isUUID(applicationSecret)) {
        throw httpErrors.Unauthorized(`Invalid application secret: ${applicationSecret}`);
      }

      const application = await prisma.applications.findFirst({
        where: {
          secret: applicationSecret
        }
      });
      if (!application) {
        throw httpErrors.NotFound('Application not found');
      }

      response.locals.application = application;
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
