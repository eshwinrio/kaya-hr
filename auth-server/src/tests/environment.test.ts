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
