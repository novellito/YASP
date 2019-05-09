const UserModel = require('../models/User');

module.exports = new (class UserService {
  async addNewUserToDb({ email, username }, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('User already exists!');
    const user = password
      ? new UserModel({ email, username, password })
      : new UserModel({ email, username });

    return user.save();
  }

  async loginUser(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) return { message: 'User not found' };

    const validPW = await user.isValidPassword(password);
    if (!validPW) return { message: 'Invalid Password' };

    return { user };
  }
})();
