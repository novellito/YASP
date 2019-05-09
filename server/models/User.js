const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  }
});

UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password); // compare given password with hashed one
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
