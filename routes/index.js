const RedisClient = require('ioredis'),
      { RedisInstance } = require('../lib/redis-instance'),
      { RedisSubscriber } = require('../lib/redis-subscriber');


const indexRoute = (ws, { params: { channel, user } }) => {
  const redisClient = new RedisInstance(),
        redisSubscriber = new RedisSubscriber(new RedisClient(), 'Kgs', `__keyspace@0__:${ channel }:messages`);

  redisSubscriber.addListener(
    'message',
    `${ channel }:messages`,
    function(redisChannel, _message) {
      const [ _keyspace, ...channelParts ] = redisChannel.split(':');

      redisClient.notifyClient(ws, channelParts.join(':'))
    }
  );

  redisClient.notifyClient(ws, `${ channel }:messages`);

  ws.on('message', function(JSONMessage) {
    const { message, sentAt } = JSON.parse(JSONMessage);
    redisClient.redis.sadd(
      `${ channel }:messages`,
      JSON.stringify({
        from: user,
        message,
        sentAt
      })
    )
  });
};

module.exports = indexRoute;
