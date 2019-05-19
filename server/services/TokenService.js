const jwt = require('jsonwebtoken');
const redis = require('redis');

module.exports = new (class TokenService {
  constructor() {
    // this.client = redis.createClient(6379, 'redis');
    this.client = redis.createClient();
    this.client.on('connect', function() {
      console.log('Connected to Redis..');
    });
    this.generateTokens = this.generateTokens.bind(this);
    this.deleteTokenRecord = this.deleteTokenRecord.bind(this);
    this.validateRefreshToken = this.validateRefreshToken.bind(this);
  }
  generateTokens(email) {
    const token = jwt.sign({ email }, process.env.SECRET_ONE, {
      expiresIn: '10m'
      // expiresIn: '5s'
    });
    // const token = jwt.sign({ email }, process.env.SECRET_ONE, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ email }, process.env.SECRET_TWO);

    this.client.hmset(refreshToken, ['email', email, 'jwt', token]);
    return { token, refreshToken };
  }

  deleteTokenRecord(oldToken) {
    this.client.del(oldToken);
  }

  // Ensure that the refresh token matches up with the email provided
  validateRefreshToken(token, cb) {
    this.client.hgetall(token, (err, obj) => {
      if (err) console.log('err', err);
      cb(obj);
    });
  }
})();
