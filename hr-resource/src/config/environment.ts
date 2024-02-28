export namespace Api {
  export const authDomain = new URL(process.env['API_AUTH_DOMAIN']!);
}

export namespace Cors {
  export const origins = process.env['CORS_ORIGINS']!.split(',').map((o) => o.trim());
  export const methods = process.env['CORS_METHODS']!.split(',').map((m) => m.trim());
  export const allowCredentials = process.env['CORS_ALLOW_CREDENTIALS'] === 'true';
  export const maxAge = parseInt(process.env['CORS_MAX_AGE']!);
}

export namespace Http {
  export const port = parseInt(process.env['HTTP_PORT']!);
}

export namespace Logger {
  export const directory = process.env['LOGGER_DIRECTORY'] || 'logs';
  export const outputFilename = process.env['LOGGER_OUTPUT_FILENAME'];
  export const disableFileOutput =
    process.env['LOGGER_DISABLE_FILE_OUTPUT'] === 'true';
  export const enableStackTrace =
    process.env['LOGGER_ENABLE_STACK_TRACE'] === 'true';
}
