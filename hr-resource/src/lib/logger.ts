import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import { Logger } from '../config/environment.js';

export enum LogLabel {
  HTTP = 'HTTP',
  SYSTEM = 'SYSTEM'
}

const printFormat = (label: LogLabel) =>
  format.combine(
    format.errors({ stack: true }),
    format.ms(),
    format.label({ label }),
    format.timestamp(),
    format.printf(
      ({ label, level, message, ms, stack, timestamp }) =>
        `${timestamp} [${label}] ${level} ${ms} ${message}${
          stack ? '\n' + stack : ''
        }`
    )
  );

const transportConsole = (label: LogLabel) =>
  new transports.Console({
    level: 'debug',
    format: format.combine(format.colorize(), printFormat(label))
  });

const transportFile = (label: LogLabel, level: string, filename?: string) =>
  new transports.File({
    level,
    filename,
    silent: Logger.disableFileOutput,
    dirname: Logger.directory,
    format: printFormat(label)
  });

export const logHttp = createLogger({
  transports: [
    transportConsole(LogLabel.HTTP),
    transportFile(LogLabel.HTTP, 'debug', Logger.outputFilename),
    transportFile(LogLabel.HTTP, 'error', 'http-errors.log')
  ]
});

export const logSystem = createLogger({
  transports: [
    transportConsole(LogLabel.SYSTEM),
    transportFile(LogLabel.SYSTEM, 'debug', Logger.outputFilename),
    transportFile(LogLabel.SYSTEM, 'error', 'db-errors.log')
  ]
});

export const httpLogStream = morgan('short', {
  stream: {
    write(str) {
      logHttp.debug(str);
    }
  },
});
