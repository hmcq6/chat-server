const express = require('express'),
  index = require('./routes/index'),
  version = require('./routes/version');

const Router = () => {
  /* eslint new-cap: "off" */
  const router = express.Router();

  router.ws('/:channel/:user', index);
  router.ws('/version', version);

  return router;
};

module.exports = Router;
