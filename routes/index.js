const RedisClient = require('ioredis'),
      RedisInstance = require('../lib/redis-instance'),
      RedisSubscriber = require('../lib/redis-subscriber');


const indexRoute = (ws, { params: { channel, user } }) => {
  const redisClient = new RedisInstance(),
        redisSubscriber = new RedisSubscriber(new RedisClient(), 'KEAs', `__keyspace@0__:${ channel }:messages`);

  redisSubscriber.addListener(
    'message',
    `${ channel }:messages`,
    function(wsChannel, redisChannel, message) {
      const [ _, ...channelParts ] = redisChannel.split(':');

      redisClient.notifyClient(ws, channelParts.join(':'))
    }.bind(null, channel)
  );

  redisClient.notifyClient(ws, `${ channel }:messages`);

  ws.on('message', function(message) {
    redisClient.redis.sadd(
      `${ channel }:messages`,
      JSON.stringify({
        from: user,
        message
      })
    )
  });
};

module.exports = indexRoute;
