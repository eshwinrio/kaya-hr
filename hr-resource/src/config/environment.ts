export namespace Api {
  export const authDomain = new URL(process.env['API_AUTH_DOMAIN']!);
  export const routeGraphQL = process.env['API_ROUTE_GRAPHQL']!;
}

export namespace Cors {
  export const methods = process.env['CORS_METHODS']!.split(',').map((m) => m.trim());
  export const allowCredentials = process.env['CORS_ALLOW_CREDENTIALS'] === 'true';
  export const maxAge = parseInt(process.env['CORS_MAX_AGE']!);
}

export namespace Express {
  export const routePrefix = process.env['EXPRESS_ROUTE_PREFIX']!;
  export const routeVersion = process.env['EXPRESS_ROUTE_VERSION']!;
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

export namespace Seed {
  export const defaultOrganizationBannerUrl = new URL(process.env['SEED_DEFAULT_ORGANIZATION_BANNER_URL']!);
  export const defaultOrganizationLogoUrl = new URL(process.env['SEED_DEFAULT_ORGANIZATION_LOGO_URL']!);
  export const defaultOrganizationName = process.env['SEED_DEFAULT_ORGANIZATION_NAME']!;
  export const defaultOrganizationPayrollCycleCron = process.env['SEED_DEFAULT_ORGANIZATION_PAYROLL_CYCLE_CRON']!;
  export const defaultOrganizationSummary = process.env['SEED_DEFAULT_ORGANIZATION_SUMMARY']!;
  export const defaultOrganizationWebsiteUrl = new URL(process.env['SEED_DEFAULT_ORGANIZATION_WEBSITE_URL']!);
  export const defaultRoleCode = process.env['SEED_DEFAULT_ROLE_CODE']!;
  export const defaultRoleDescription = process.env['SEED_DEFAULT_ROLE_DESCRIPTION']!;
  export const defaultRoleHourlyWage = parseFloat(process.env['SEED_DEFAULT_ROLE_HOURLY_WAGE']!);
  export const defaultRoleTitle = process.env['SEED_DEFAULT_ROLE_TITLE']!;
  export const defaultUserBannerUrl = new URL(process.env['SEED_DEFAULT_USER_BANNER_URL']!);
  export const defaultUserCity = process.env['SEED_DEFAULT_USER_CITY']!;
  export const defaultUserCountry = process.env['SEED_DEFAULT_USER_COUNTRY']!;
  export const defaultUserDateJoined = process.env['SEED_DEFAULT_USER_DATE_JOINED']!;
  export const defaultUserDateOfBirth = process.env['SEED_DEFAULT_USER_DATE_OF_BIRTH']!;
  export const defaultUserEmail = process.env['SEED_DEFAULT_USER_EMAIL']!;
  export const defaultUserFirstName = process.env['SEED_DEFAULT_USER_FIRST_NAME']!;
  export const defaultUserLastName = process.env['SEED_DEFAULT_USER_LAST_NAME']!;
  export const defaultUserPassword = process.env['SEED_DEFAULT_USER_PASSWORD'];
  export const defaultUserPhone = process.env['SEED_DEFAULT_USER_PHONE']!;
  export const defaultUserPincode = process.env['SEED_DEFAULT_USER_PINCODE']!;
  export const defaultUserProfilePictureUrl = new URL(process.env['SEED_DEFAULT_USER_PROFILE_PICTURE_URL']!);
  export const defaultUserProvince = process.env['SEED_DEFAULT_USER_PROVINCE']!;
  export const defaultUserStreetName = process.env['SEED_DEFAULT_USER_STREET_NAME']!;
}
