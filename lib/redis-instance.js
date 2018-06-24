const RedisClient = require('ioredis');

RedisClient.Promise.onPossiblyUnhandledRejection((err) => {
  console.log(err);
});

class RedisInstance {
  constructor(redis = new RedisClient()) {
    this.redis = redis;
  }

  async notifyClient(ws, redisChannel) {
    const data = (await this.redis.smembers(redisChannel)).map(JSON.parse);

    ws.send(JSON.stringify(data));
  }
}

module.exports = RedisInstance;
