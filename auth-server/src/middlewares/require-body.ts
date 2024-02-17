import { RequestHandler, Router } from 'express';
import httpErrors from 'http-errors';

type ExpectedObject = Record<string, any>;
type EnforcedBody<T extends ExpectedObject, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
type BodyEnforcer<T extends ExpectedObject, K extends keyof T> = RequestHandler<any, any, EnforcedBody<T, K>>;

export default function <T extends ExpectedObject, K extends keyof T>(...keys: Array<K>): BodyEnforcer<T, K> {
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
        const terminationPhrase = `propert${missingKeys.length > 1 ? 'ies' : 'y'}`;
        throw httpErrors.BadRequest(`Request body is missing ${terminationPhrase}: ${missingKeys.join()} `);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
