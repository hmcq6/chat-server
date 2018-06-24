const express = require('express'),
  index = require('./routes/index'),
  version = require('./routes/version'),
  Router = () => {
    const router = express.Router();

    router.ws('/:channel/:user', index);
    router.ws('/version', version);

    return router;
  };

module.exports = Router;
