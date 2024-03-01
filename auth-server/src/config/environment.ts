export namespace Bcrypt {
  export const saltRounds = parseInt(process.env['BCRYPT_SALT_ROUNDS']!);
}

export namespace Cors {
  export const origins = process.env['CORS_ORIGINS']!.split(',').map((o) => o.trim());
  export const methods = process.env['CORS_METHODS']!.split(',').map((m) => m.trim());
  export const allowCredentials = process.env['CORS_ALLOW_CREDENTIALS'] === 'true';
  export const maxAge = parseInt(process.env['CORS_MAX_AGE']!);
}

export namespace Http {
  export const port = parseInt(process.env['HTTP_PORT']!);
  export const responseVerifyTokenCacheEnable = process.env['HTTP_RESPONSE_VERIFY_TOKEN_CACHE_ENABLE'];
  export const responseVerifyTokenCacheMaxAge = parseInt(process.env['HTTP_RESPONSE_VERIFY_TOKEN_CACHE_MAX_AGE']!);
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

export namespace Seed {
  export const defaultApplicationId = parseInt(process.env['SEED_DEFAULT_APPLICATION_ID']!, 10);
  export const defaultApplicationName = process.env['SEED_DEFAULT_APPLICATION_NAME']!;
  export const defaultApplicationSecret = process.env['SEED_DEFAULT_APPLICATION_SECRET']!;
  export const defaultUserEmail = process.env['SEED_DEFAULT_USER_EMAIL']!;
  export const defaultUserFirstName = process.env['SEED_DEFAULT_USER_FIRST_NAME']!;
  export const defaultUserLastName = process.env['SEED_DEFAULT_USER_LAST_NAME']!;
  export const defaultUserPassword = process.env['SEED_DEFAULT_USER_PASSWORD']!;
}
