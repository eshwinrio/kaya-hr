import { expect } from "chai";

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
