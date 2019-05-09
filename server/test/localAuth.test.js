const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../index');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
chai.use(chaiHTTP);

describe('Local Auth Suite', () => {
  let user;
  const creds = {
    email: 'testUser@test.com',
    password: 'password123'
  };

  beforeEach(async () => {
    const hash = await bcrypt.hash('password123', 10);
    user = new UserModel({
      email: 'testUser@test.com',
      username: 'newUser',
      password: hash
    });
    user.save();
  });

  afterEach(async () => {
    await UserModel.findOneAndDelete({ email: 'testUser@test.com' });
  });

  it('Should sign up a new user', async () => {
    const newUser = {
      email: 'newUser@test.com',
      username: 'newUser',
      password: 'jawdans'
    };

    const response = await chai
      .request(app)
      .post('/api/local/signup')
      .send(newUser);

    expect(response.statusCode).to.equal(200);
    expect(response.body.message).to.equal('Signup successful');
    await UserModel.findOneAndDelete({ email: 'newUser@test.com' });

    return response;
  });

  it('Should reject signup with a short password ', async () => {
    const newUser = {
      email: 'newUser@test.com',
      username: 'newUser',
      password: 'foo'
    };

    const response = await chai
      .request(app)
      .post('/api/local/signup')
      .send(newUser);

    expect(response.error).to.exist;
    await UserModel.findOneAndDelete({ email: 'newUser@test.com' });

    return response;
  });

  it('Should log in the user', async () => {
    const response = await chai
      .request(app)
      .post('/api/local/login')
      .send(creds);

    expect(response.statusCode).to.equal(200);
    expect(response.body.user.token).to.exist;
    expect(response.body.user.refreshToken).to.exist;

    return response;
  });

  it('Should access the protected route', async () => {
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      'super-secret'
    );

    const response = await chai
      .request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(creds);

    expect(response.statusCode).to.equal(200);
    expect(response.body.token).to.exist;
    expect(response.body.msg).to.equal('This route is protected!');

    return response;
  });
});
