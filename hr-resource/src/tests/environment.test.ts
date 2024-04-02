import { expect } from "chai";
import validator from 'validator';
import nodeCron from 'node-cron';
import cronParser from 'cron-parser';

describe('API configurations', () => {
  it('API_AUTH_DOMAIN', (done) => {
    const authDomain = process.env['API_AUTH_DOMAIN'];
    expect(authDomain).not.to.be.undefined;
    expect(validator.isURL(authDomain!, { require_tld: false })).to.be.true;
    done();
  });

  it('API_ROUTE_GRAPHQL', (done) => {
    const value = process.env['API_ROUTE_GRAPHQL'];
    expect(value).not.to.be.undefined;
    const pathnameRegex = /^\/[a-z0-9-._~%!$&'()*+,;=:@]+$/i;
    expect(pathnameRegex.test(value!), `Invalid pathname: ${value}`).to.be.true;
    done();
  });
});

describe('CORS configurations', () => {
  it('CORS_METHODS', (done) => {
    const methods = process.env['CORS_METHODS'];
    expect(methods).not.to.be.undefined;
    const methodsArray = methods!.split(',').map((method) => method.trim());
    expect(methodsArray).to.have.lengthOf.above(0);
    methodsArray.forEach((method) => {
      expect(method).to.be.oneOf(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']);
    });
    done();
  });

  it('CORS_ALLOW_CREDENTIALS', (done) => {
    const allowCredentials = process.env['CORS_ALLOW_CREDENTIALS'];
    expect(allowCredentials).not.to.be.undefined;
    expect(allowCredentials).to.be.oneOf(['true', 'false']);
    done();
  });

  it('CORS_MAX_AGE', (done) => {
    const maxAge = process.env['CORS_MAX_AGE'];
    expect(maxAge).not.to.be.undefined;
    const parsedMaxAge = parseInt(maxAge!);
    expect(parsedMaxAge).not.to.be.NaN;
    expect(parsedMaxAge).to.be.a('number').that.is.above(0);
    done();
  });
});

describe('Database configurations', () => {
  it('DATABASE_URL', (done) => {
    const value = process.env['DATABASE_URL'];
    expect(value).not.to.be.undefined;
    done();
  });
});

describe('Express configurations', () => {
  it('EXPRESS_ROUTE_PREFIX', (done) => {
    const routePrefix = process.env['EXPRESS_ROUTE_PREFIX'];
    expect(routePrefix).not.to.be.undefined;
    const pathnameRegex = /^(\/[a-z0-9-._~%!$&'()*+,;=:@]+)*\/?$/i;
    expect(pathnameRegex.test(routePrefix!), `Invalid route prefix: ${routePrefix}`).to.be.true;
    done();
  });

  it('EXPRESS_ROUTE_VERSION', (done) => {
    const routeVersion = process.env['EXPRESS_ROUTE_VERSION'];
    expect(routeVersion).not.to.be.undefined;
    const versionRegex = /^\d+\.\d+$/;
    expect(versionRegex.test(routeVersion!), `Invalid route version: ${routeVersion}`).to.be.true;
    done();
  });
});

describe('HTTP configurations', () => {
  it('HTTP_PORT', (done) => {
    const value = process.env['HTTP_PORT'];
    expect(value).not.to.be.undefined;
    const parsed = parseInt(value!);
    expect(parsed).not.to.be.NaN;
    expect(parsed).to.be.above(0).below(9999);
    done();
  });
});

describe('File system output configurations', () => {
  it('FS_OUTPUT_DIRECTORY', (done) => {
    const value = process.env['FS_OUTPUT_DIRECTORY'];
    expect(value).not.to.be.undefined;
    done();
  });
});
describe('Seed configurations', () => {
  it('SEED_DEFAULT_ORGANIZATION_BANNER_URL', (done) => {
    const url = new URL(process.env['SEED_DEFAULT_ORGANIZATION_BANNER_URL']!);
    expect(url).not.to.be.undefined;
    expect(validator.isURL(url.toString(), { require_tld: false })).to.be.true;
    done();
  });

  it('SEED_DEFAULT_ORGANIZATION_LOGO_URL', (done) => {
    const url = new URL(process.env['SEED_DEFAULT_ORGANIZATION_LOGO_URL']!);
    expect(url).not.to.be.undefined;
    expect(validator.isURL(url.toString(), { require_tld: false })).to.be.true;
    done();
  });

  it('SEED_DEFAULT_ORGANIZATION_NAME', (done) => {
    const value = process.env['SEED_DEFAULT_ORGANIZATION_NAME'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_ORGANIZATION_PAYROLL_CYCLE_CRON', (done) => {
    const value = process.env['SEED_DEFAULT_ORGANIZATION_PAYROLL_CYCLE_CRON'];
    expect(value).not.to.be.undefined;
    expect(cronParser.parseExpression(value!)).not.to.have.property('errors');
    expect(nodeCron.validate(value!), `${value} is not a valid cron expression`).to.be.true;
    done();
  })

  it('SEED_DEFAULT_ORGANIZATION_SUMMARY', (done) => {
    const value = process.env['SEED_DEFAULT_ORGANIZATION_SUMMARY'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_ORGANIZATION_WEBSITE_URL', (done) => {
    const url = new URL(process.env['SEED_DEFAULT_ORGANIZATION_WEBSITE_URL']!);
    expect(url).not.to.be.undefined;
    expect(validator.isURL(url.toString(), { require_tld: false })).to.be.true;
    done();
  });

  it('SEED_DEFAULT_ROLE_CODE', (done) => {
    const value = process.env['SEED_DEFAULT_ROLE_CODE'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_ROLE_DESCRIPTION', (done) => {
    const value = process.env['SEED_DEFAULT_ROLE_DESCRIPTION'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_ROLE_HOURLY_WAGE', (done) => {
    const value = process.env['SEED_DEFAULT_ROLE_HOURLY_WAGE'];
    expect(value).not.to.be.undefined;
    const parsedValue = parseFloat(value!);
    expect(parsedValue).not.to.be.NaN;
    expect(parsedValue).to.be.a('number');
    done();
  });

  it('SEED_DEFAULT_ROLE_TITLE', (done) => {
    const value = process.env['SEED_DEFAULT_ROLE_TITLE'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_USER_BANNER_URL', (done) => {
    const url = new URL(process.env['SEED_DEFAULT_USER_BANNER_URL']!);
    expect(url).not.to.be.undefined;
    expect(validator.isURL(url.toString(), { require_tld: false })).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_CITY', (done) => {
    const value = process.env['SEED_DEFAULT_USER_CITY'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_USER_COUNTRY', (done) => {
    const value = process.env['SEED_DEFAULT_USER_COUNTRY'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_USER_DATE_JOINED', (done) => {
    const value = process.env['SEED_DEFAULT_USER_DATE_JOINED'];
    expect(value).not.to.be.undefined;
    expect(validator.isISO8601(value!)).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_DATE_OF_BIRTH', (done) => {
    const value = process.env['SEED_DEFAULT_USER_DATE_OF_BIRTH'];
    expect(value).not.to.be.undefined;
    expect(validator.isISO8601(value!)).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_EMAIL', (done) => {
    const value = process.env['SEED_DEFAULT_USER_EMAIL'];
    expect(value).not.to.be.undefined;
    expect(validator.isEmail(value!)).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_FIRST_NAME', (done) => {
    const value = process.env['SEED_DEFAULT_USER_FIRST_NAME'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_USER_LAST_NAME', (done) => {
    const value = process.env['SEED_DEFAULT_USER_LAST_NAME'];
    expect(value).not.to.be.undefined;
    done();
  });


  it('SEED_DEFAULT_USER_PASSWORD', (done) => {
    const value = process.env['SEED_DEFAULT_USER_PASSWORD'];
    expect(value).not.to.be.undefined;
    expect(validator.isStrongPassword(value!, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }), `${value} is not a strong password`).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_PHONE', (done) => {
    const value = process.env['SEED_DEFAULT_USER_PHONE'];
    expect(value).not.to.be.undefined;
    expect(validator.isMobilePhone(value!), `${value} is not a valid phone number`).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_PINCODE', (done) => {
    const value = process.env['SEED_DEFAULT_USER_PINCODE'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_USER_PROFILE_PICTURE_URL', (done) => {
    const value = process.env['SEED_DEFAULT_USER_PROFILE_PICTURE_URL'];
    expect(value).not.to.be.undefined;
    expect(validator.isURL(value!), `${value} is not a valid URL`).to.be.true;
    done();
  });

  it('SEED_DEFAULT_USER_PROVINCE', (done) => {
    const value = process.env['SEED_DEFAULT_USER_PROVINCE'];
    expect(value).not.to.be.undefined;
    done();
  });

  it('SEED_DEFAULT_USER_STREET_NAME', (done) => {
    const value = process.env['SEED_DEFAULT_USER_STREET_NAME'];
    expect(value).not.to.be.undefined;
    done();
  });
});
