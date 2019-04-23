const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();
client.on('connect', function() {
  console.log('Connected to Redis...');
});

module.exports = new class UserService {
  async addNewUserToDb(email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('User already exists!');
    const user = password
      ? new UserModel({ email, password })
      : new UserModel({ email });

    return user.save();
  }

  async loginUser(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) return { message: 'User not found' };

    const validPW = await user.isValidPassword(password);
    if (!validPW) return { message: 'Invalid Password' };

    return { user };
  }

  generateTokens(email) {
    const token = jwt.sign({ email }, process.env.SECRET_ONE);
    const refreshToken = jwt.sign({ email }, process.env.SECRET_ONE);

    client.hmset(refreshToken, ['email', email, 'jwt', token]);
    return { token, refreshToken };
  }
}();

// module.exports = () => new UserService();
// module.exports = client => new UserService(client);
