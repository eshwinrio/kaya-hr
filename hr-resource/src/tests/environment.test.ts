import { expect } from "chai";
import validator from 'validator';

describe('API configurations', () => {
  it('Auth domain URL', (done) => {
    const authDomain = process.env['API_AUTH_DOMAIN'];
    expect(authDomain).not.to.be.undefined;
    expect(validator.isURL(authDomain!, { require_tld: false }), `${authDomain} is not a valid URL`).to.be.true;
    done();
  });
});

describe('CORS configurations', () => {
  it('CORS origins', (done) => {
    const origins = process.env['CORS_ORIGINS'];
    expect(origins).not.to.be.undefined;
    const originsArray = origins!.split(',').map((origin) => origin.trim());
    expect(originsArray).to.have.lengthOf.above(0);
    originsArray.forEach((origin) => {
      expect(validator.isURL(origin, { require_tld: false }), `${origin} is not a valid URL`).to.be.true;
    });
    done();
  });

  it('CORS methods', (done) => {
    const methods = process.env['CORS_METHODS'];
    expect(methods).not.to.be.undefined;
    const methodsArray = methods!.split(',').map((method) => method.trim());
    expect(methodsArray).to.have.lengthOf.above(0);
    methodsArray.forEach((method) => {
      expect(method).to.be.oneOf(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']);
    });
    done();
  });

  it('CORS allow credentials', (done) => {
    const allowCredentials = process.env['CORS_ALLOW_CREDENTIALS'];
    expect(allowCredentials).not.to.be.undefined;
    expect(allowCredentials).to.be.oneOf(['true', 'false']);
    done();
  });

  it('CORS max age', (done) => {
    const maxAge = process.env['CORS_MAX_AGE'];
    expect(maxAge).not.to.be.undefined;
    const parsedMaxAge = parseInt(maxAge!);
    expect(parsedMaxAge).not.to.be.NaN;
    expect(parsedMaxAge).to.be.a('number').that.is.above(0);
    done();
  });
});

describe('Database configurations', () => {
  it('Database URL', (done) => {
    const value = process.env['DATABASE_URL'];
    expect(value).not.to.be.undefined;
    done();
  });
});

describe('HTTP configurations', () => {
  it('HTTP port', (done) => {
    const value = process.env['HTTP_PORT'];
    expect(value).not.to.be.undefined;
    const parsed = parseInt(value!);
    expect(parsed).not.to.be.NaN;
    expect(parsed).to.be.above(0).below(9999);
    done();
  });
});
