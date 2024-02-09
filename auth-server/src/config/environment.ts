export namespace Bcrypt {
  export const saltRounds = parseInt(process.env['BCRYPT_SALT_ROUNDS']!);
}

export namespace Http {
  export const port = parseInt(process.env['HTTP_PORT']!);
}

export namespace JWT {
  export const authorizationSecret = process.env['JWT_AUTHORIZATION_SECRET']!;
  export const authorizationValidity = parseInt(
    process.env['JWT_AUTHORIZATION_VALIDITY']!
  );
  export const accessSecret = process.env['JWT_ACCESS_SECRET']!;
  export const accessValidity = parseInt(process.env['JWT_ACCESS_VALIDITY']!);
}

export namespace Logger {
  export const directory = process.env['LOGGER_DIRECTORY'] || 'logs';
  export const outputFilename = process.env['LOGGER_OUTPUT_FILENAME'];
  export const disableFileOutput =
    process.env['LOGGER_DISABLE_FILE_OUTPUT'] === 'true';
  export const enableStackTrace =
    process.env['LOGGER_ENABLE_STACK_TRACE'] === 'true';
}
