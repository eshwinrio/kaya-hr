import { RequestHandler } from 'express';
import httpErrors from 'http-errors';

type ExpectedObject = Record<string, any>;
type HeadersEnforcer = RequestHandler;

export default function <O extends ExpectedObject>(
  ...keys: Array<keyof O>
): HeadersEnforcer {
  return (request, _response, next) => {
    try {
      const missingKeys = keys.filter(
        (key) => !request.get(typeof key === 'string' ? key : key.toString())
      );
      if (missingKeys.length) {
        const terminationPhrase = `header${missingKeys.length > 1 ? 's' : ''}`;
        throw httpErrors.BadRequest(`Request is missing ${terminationPhrase}: ${missingKeys.join()}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
