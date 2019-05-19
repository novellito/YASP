const UserModel = require('../models/User');

module.exports = new (class UserService {
  async addNewUserToDb({ email, username }, password) {
    const existingUser = await this.getUserInfo(email);

    if (existingUser.message && !password) {
      // user is registering with social for the first time
      return new UserModel({ email, username }).save();
    } else if (existingUser.message) {
      // user registering locally
      return new UserModel({ email, username, password }).save();
    }

    if (existingUser && password) {
      throw new Error('User already exists!');
    } else {
      // User is logging in with social account
      return existingUser;
    }
  }

  async loginUser(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) return { message: 'User not found' };

    const validPW = await user.isValidPassword(password);
    if (!validPW) return { message: 'Invalid Password' };

    return { user };
  }

  async getUserInfo(email) {
    const user = await UserModel.findOne({ email });
    if (!user) return { message: 'User not found' };

    return { username: user.username, email: user.email, _id: user._id };
  }
})();
