import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';
import type { HttpError } from 'http-errors';
import { logHttp } from '../lib/logger.js';

const errorHandler: ErrorRequestHandler = (error: HttpError, _req, res, _next) => {
  if (!isHttpError(error).valueOf()) {
    error.status = 500;
  }
  logHttp.error(error.message, { stack: error.stack });
  res.status(error.status).send(error.message);
};

export default errorHandler;
