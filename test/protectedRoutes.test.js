const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const app = require('../index');
const controller = require('../controllers/protected-routes');
const sinon = require('sinon');
chai.use(chaiHTTP);

describe('Protected Routes Suite', () => {
  it('Should send back a valid response', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = () => {};
    req.user = 'bob';
    req.headers.authorization = 'Bearer foobar123';
    const spy = sinon.spy(controller.sendResponse);
    spy(req, res, next);
    // console.log('res', res.json);
    console.log('return', spy.returnValue);
    // expect.
  });
});
