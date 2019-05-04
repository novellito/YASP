const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const userSVC = require('../services/UserService');
const mongoose = require('mongoose');
const UserModel = require('../models/User');

chai.use(chaiHTTP);

describe('User Service Suite', () => {
  let email;
  beforeEach(() => {
    email = 'test@test.com';
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should add a new user to the DB', async () => {
    sinon.stub(UserModel, 'findOne').returns(null);
    sinon.stub(UserModel.prototype, 'save').returns({ _id: '123', email });

    const user = await userSVC.addNewUserToDb({ email });
    expect(user.email).to.equal(email);
    expect(user._id).to.equal('123');
  });
  it('should throw an error that the user exists', async () => {
    sinon.stub(UserModel, 'findOne').returns('existingUser');
    try {
      await userSVC.addNewUserToDb({ email });
    } catch (err) {
      expect(err).to.exist;
    }
  });
});
