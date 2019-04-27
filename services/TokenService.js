const jwt = require('jsonwebtoken');
const redis = require('redis');

const client = redis.createClient();
client.on('connect', function() {
  console.log('Connected to Redis...');
});

module.exports = new class TokenService {
  generateTokens(email) {
    const token = jwt.sign({ email }, process.env.SECRET_ONE, {
      expiresIn: '10s'
    });
    // const token = jwt.sign({ email }, process.env.SECRET_ONE, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ email }, process.env.SECRET_TWO);

    client.hmset(refreshToken, ['email', email, 'jwt', token]);
    return { token, refreshToken };
  }

  deleteTokenRecord(oldToken) {
    client.del(oldToken);
  }

  // Ensure that the refresh token matches up with the email provided
  validateRefreshToken(token, cb) {
    client.hgetall(token, (err, obj) => {
      if (err) console.log('err', err);
      cb(obj);
    });
  }
}();
