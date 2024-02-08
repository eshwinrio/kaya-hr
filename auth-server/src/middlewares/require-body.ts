import { RequestHandler, Router } from 'express';
import httpErrors from 'http-errors';

type ExpectedObject = Record<string, any>;
type BodyEnforcer<O extends ExpectedObject = {}> = RequestHandler<any, any, O>;

export default function <O extends ExpectedObject>(
  ...keys: Array<keyof O>
): BodyEnforcer<O> {
  return (request, _response, next) => {
    try {
      if (!request.body) {
        throw httpErrors.BadRequest('Request is missing body');
      }
      const requestBodyKeys = Object.keys(request.body);
      const missingKeys = keys.filter(
        (key) =>
          !requestBodyKeys.includes(
            typeof key !== 'string' ? key.toString() : key
          )
      );
      if (missingKeys.length) {
        const terminationPhrase = `propert${
          missingKeys.length > 1 ? 'ies' : 'y'
        }`;
        throw httpErrors.BadRequest(`Request body is missing ${terminationPhrase}: ${missingKeys.join()} `);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
