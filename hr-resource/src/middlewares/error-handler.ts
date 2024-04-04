import { ErrorRequestHandler } from 'express';
import type { HttpError } from 'http-errors';
import { isHttpError } from 'http-errors';
import { logHttp } from '../lib/logger.js';

const errorHandler: ErrorRequestHandler = (error: HttpError, _req, res, _next) => {
  if (!isHttpError(error).valueOf()) {
    error.status = 500;
  }
  const { stack, ...rest } = error;
  logHttp.error(rest.message, { stack });
  res.status(error.status).json(rest);
};

export default errorHandler;
