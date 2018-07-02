const express = require('express'),
      /* eslint no-mixed-requires: "off" */
      app = express(),
      /* eslint no-unused-vars: "off" */
      expressWs = require('express-ws')(app),
      router = require('./router.js');

app.use('/', router());

app.listen(7611);

module.exports = app;
