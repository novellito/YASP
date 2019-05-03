const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const tokenSVC = require('../services/TokenService');
chai.use(chaiHTTP);
const redis = require('redis-mock');
client = redis.createClient();

describe('Token Service Suite', () => {
  beforeEach(() => {
    tokenSVC.client = client;
  });

  it('Should generate a jwt and refresh token', () => {
    const email = 'testuser@test.com';

    const { token, refreshToken } = tokenSVC.generateTokens(email);

    expect(token).to.exist;
    expect(refreshToken).to.exist;
  });

  it('Should call the mock client redis delete method', () => {
    tokenSVC.client.del = sinon
      .stub()
      .callsFake(token => expect(token).to.equal('token123'));

    tokenSVC.deleteTokenRecord('token123');

    sinon.assert.calledOnce(tokenSVC.client.del);
  });

  it('Should validate the refresh token', () => {
    const testEmail = 'test@test.com';

    tokenSVC.client.hgetall = sinon.stub().callsFake((token, cb) => {
      expect(token).to.equal('token123');
      cb(null, { email: testEmail });
    });

    tokenSVC.validateRefreshToken('token123', obj => {
      expect(obj.email).to.equal(testEmail);
    });
  });
});
