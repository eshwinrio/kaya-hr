import { RequestHandler, Router } from 'express';
import httpErrors from 'http-errors';

type EnforcedQueries<T extends qs.ParsedQs, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
type QueryEnforcer<T extends qs.ParsedQs, K extends keyof T> = RequestHandler<unknown, unknown, unknown, EnforcedQueries<T, K>>;

export default function <T extends qs.ParsedQs, K extends keyof T>(...keys: Array<K>): QueryEnforcer<T, K> {
  return (request, _response, next) => {
    try {
      if (!request.query) {
        throw httpErrors.BadRequest('Request is missing search parameters');
      }
      const requestParamKeys = Object.keys(request.query);
      const missingKeys = keys.filter(
        (key) =>
          !requestParamKeys.includes(
            typeof key !== 'string' ? key.toString() : key
          )
      );
      if (missingKeys.length) {
        const terminationPhrase = `parameter${missingKeys.length > 1 ? 's' : ''}`;
        throw httpErrors.BadRequest(`Request is missing search ${terminationPhrase}: ${missingKeys.join()}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
