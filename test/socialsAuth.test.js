const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const controller = require('../controllers/socialAuth');

chai.use(chaiHTTP);

describe('Socials Auth Suite', () => {
  it('Should call send response', done => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.body = {
      user: 'bob',
      token: '123',
      refreshToken: '456'
    };
    const spy = sinon.spy(controller.sendResponse);

    spy(req, res);

    expect(spy.called).to.be.true;
    done();
  });
});
