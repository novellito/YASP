const jwt = require('jsonwebtoken');
const redis = require('redis');

module.exports = new (class TokenService {
  constructor() {
    this.client = redis.createClient(
      process.env.REDIS_URL || process.env.DOCKER_REDIS || null
    );
    this.client.on('connect', function() {
      console.log(
        process.env.REDIS
          ? 'Connected to Prod Redis!'
          : 'Connected to Local Redis!'
      );
    });
    this.generateTokens = this.generateTokens.bind(this);
    this.deleteTokenRecord = this.deleteTokenRecord.bind(this);
    this.validateRefreshToken = this.validateRefreshToken.bind(this);
  }
  generateTokens(email) {
    const token = jwt.sign({ email }, process.env.SECRET_ONE, {
      expiresIn: '30m'
      // expiresIn: '5s'
    });
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
