const { version } = require('../package.json');

const versionRoute = (ws, _req) => {
  ws.send(`Redis Chat Server version: ${version}`);
  ws.close(1000, 'Connection closed normally');
};

module.exports = versionRoute;
