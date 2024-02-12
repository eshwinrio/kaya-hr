import { expect } from "chai";
import validator from "validator";

describe('Bcrypt configurations', () => {
  it('Salt rounds', (done) => {
    const value = process.env['BCRYPT_SALT_ROUNDS'];
    expect(value).not.to.be.undefined;
    const parsed = parseInt(value!);
    expect(parsed).not.to.be.NaN;
    expect(parsed).to.be.above(0).and.below(20);
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

  it('HTTP response verify token cache enable', (done) => {
    const cacheEnable = process.env['HTTP_RESPONSE_VERIFY_TOKEN_CACHE_ENABLE'];
    expect(cacheEnable).to.satisfy((val: string | undefined) => val === 'true' || val === 'false' || val === undefined);
    if (cacheEnable) {
      expect(cacheEnable).to.be.oneOf(['true', 'false']);
    }
    done();
  });

  it('HTTP response verify token cache max age', (done) => {
    const maxAge = process.env['HTTP_RESPONSE_VERIFY_TOKEN_CACHE_MAX_AGE'];
    expect(maxAge).not.to.be.undefined;
    const parsedMaxAge = parseInt(maxAge!);
    expect(parsedMaxAge).not.to.be.NaN;
    expect(parsedMaxAge).to.equal(86400);
    done();
  });
});

describe('JWT configurations', () => {
  it('Access secret', (done) => {
    const value = process.env['JWT_ACCESS_SECRET'];
    expect(value).not.to.be.undefined.empty;
    expect(validator.isStrongPassword(value!), 'Weak secret').to.be.true;
    done();
  });

  it('Access token validity', (done) => {
    const value = process.env['JWT_ACCESS_VALIDITY'];
    expect(value).not.to.be.undefined;
    const parsed = parseInt(value!);
    expect(parsed).to.be.a('number').and.not.to.be.NaN;
    done();
  });

  it('Authorization secret', (done) => {
    const value = process.env['JWT_AUTHORIZATION_SECRET'];
    expect(value).not.to.be.undefined.empty;
    expect(validator.isStrongPassword(value!), 'Weak secret').to.be.true;
    done();
  });

  it('Authorization token validity', (done) => {
    const value = process.env['JWT_AUTHORIZATION_VALIDITY'];
    expect(value).not.to.be.undefined;
    const parsed = parseInt(value!);
    expect(parsed).to.be.a('number').and.not.to.be.NaN;
    done();
  });
});
