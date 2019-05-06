const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const userSVC = require('../services/UserService');
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

  it('should login a user', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .returns({ _id: '123', email, isValidPassword: () => true });

    const { user } = await userSVC.loginUser(email, 'pw123');

    expect(user.email).to.equal(email);
    expect(user._id).to.equal('123');
  });

  it('should fail to login a user with an invalid password', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .returns({ _id: '123', email, isValidPassword: () => false });

    const { message } = await userSVC.loginUser(email, 'pw123');

    expect(message).to.exist;
    expect(message).to.equal('Invalid Password');
  });
  it('should fail to login a user that does not exist', async () => {
    sinon.stub(UserModel, 'findOne').returns(null);

    const { message } = await userSVC.loginUser(email, 'pw123');

    expect(message).to.exist;
    expect(message).to.equal('User not found');
  });
});
