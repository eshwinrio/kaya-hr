import { RequestHandler, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import httpErrors from 'http-errors';

type EnforcedParams<T extends ParamsDictionary, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
type ParamsEnforcer<T extends ParamsDictionary, K extends keyof T> = RequestHandler<EnforcedParams<T, K>>;

export default function <T extends ParamsDictionary, K extends keyof T>(...keys: Array<K>): ParamsEnforcer<T, K> {
  return (request, _response, next) => {
    try {
      if (!request.params) {
        throw httpErrors.BadRequest('Request is missing parameters');
      }
      const requestParamKeys = Object.keys(request.params);
      const missingKeys = keys.filter(
        (key) =>
          !requestParamKeys.includes(
            typeof key !== 'string' ? key.toString() : key
          )
      );
      if (missingKeys.length) {
        const terminationPhrase = `parameter${missingKeys.length > 1 ? 's' : ''}`;
        throw httpErrors.BadRequest(`Request is missing ${terminationPhrase}: ${missingKeys.join()}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
