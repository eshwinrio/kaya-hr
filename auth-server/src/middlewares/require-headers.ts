import { RequestHandler, Router } from 'express';
import createHttpError from 'http-errors';
import { BAD_REQUEST } from 'http-status';

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
        throw createHttpError(
          BAD_REQUEST,
          new Error(
            `Request is missing ${missingKeys.join()} ${terminationPhrase}`
          )
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}