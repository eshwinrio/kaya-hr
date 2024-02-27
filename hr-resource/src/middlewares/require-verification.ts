import { RequestHandler } from 'express';
import httpErrors from 'http-errors';
import { verifyIdentity } from '../lib/fetch-requests.js';

export type Locals = Record<'email', string>;
export type AuthenticityEnforcer = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export default function(): AuthenticityEnforcer {
  return async (request, response, next) => {
    try {
      // Append all headers from the request to the headers object
      const headers = new Headers();
      for (const [key, value] of Object.entries(request.headers)) {
        if (value === undefined) continue;
        headers.append(key, Array.isArray(value) ? value.join(',') : value);
      }

      const verificationResponse = await verifyIdentity({ headers });
      console.log(verificationResponse);
      if (!verificationResponse.ok) {
        const errorBody = await verificationResponse.json();
        if (httpErrors.isHttpError(errorBody)) {
          throw errorBody;
        }
        throw httpErrors(verificationResponse.status, verificationResponse.statusText);
      }
      const responseBody = await verificationResponse.json() as { email: string };
      response.locals.email = responseBody.email;
      next();
    } catch (error) {
      next(error);
    }
  };
}
