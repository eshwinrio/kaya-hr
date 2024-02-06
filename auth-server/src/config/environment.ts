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
