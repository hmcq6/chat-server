const RedisClient = require('ioredis');

RedisClient.Promise.onPossiblyUnhandledRejection((err) => {
  throw err;
});

class RedisInstance {
  constructor(redis = new RedisClient()) {
    this.redis = redis;
  }

  async notifyClient(ws, redisChannel) {
    ws.send(
      JSON.stringify(
        (await this.redis.smembers(redisChannel)).map(JSON.parse)
      )
    );
  }
}

module.exports = { RedisInstance };
