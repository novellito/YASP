const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const app = require('../index');
const sinon = require('sinon');
const controller = require('../controllers/socialAuth');
chai.use(chaiHTTP);

describe('Socials Auth Suite', () => {
  it('Should call send response', done => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    const spy = sinon.spy(controller.sendResponse);
    spy(req, res);
    expect(spy.called).to.be.true;
    done();
  });
});
