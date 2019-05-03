const chai = require('chai');
const chaiHTTP = require('chai-http');
const httpMocks = require('node-mocks-http');
const controller = require('../controllers/protected-routes');
const sinon = require('sinon');
const tokenSVC = require('../services/TokenService');

chai.use(chaiHTTP);

describe('Protected Routes Suite', () => {
  it('Should validate the refresh token when retrieving new ones', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.body.email = 'testuser@test.com';
    req.headers.authorization = 'Bearer foobar123';

    const validateRefreshTokenStub = sinon.stub(
      tokenSVC,
      'validateRefreshToken'
    );

    controller.getNewTokens(req, res);

    sinon.assert.calledOnce(validateRefreshTokenStub);
  });
  it('Should call the delete token record function when the controller is called', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.headers.authorization = 'Bearer foobar123';

    const deleteTokenRecordStub = sinon.stub(tokenSVC, 'deleteTokenRecord');
    controller.deleteToken(req, res);

    sinon.assert.calledOnce(deleteTokenRecordStub);
  });
});
