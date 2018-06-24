const RedisClient = require('ioredis'),
      RedisInstance = require('./redis-instance');

class RedisSubscriber extends RedisInstance {
  constructor(redis = new RedisClient(), keyspaceFlags = 'KEAs', ...subscriptions) {
    super(...arguments);

    this.listeners = new Map();

    this.redis.config('set', 'notify-keyspace-events', keyspaceFlags);

    for (const subscription of subscriptions) {
      this.subscribe(subscription);
    }
  }

  addListener(event, key, listener) {
    if (this.listeners.get(key)) {
      this.removeListener(event, key);
    }
    this.listeners.set(key, listener);
    this.on(event, listener);
  }

  on(event, listener) {
    this.redis.on(event, listener);
  }

  removeListener(event, key) {
    this.redis.removeListener(event, this.listeners.get(key));
  }

  subscribe(key) {
    this.redis.subscribe(key);
  }
}

module.exports = RedisSubscriber;
