const express = require('express'),
      app = express(),
      expressWs = require('express-ws')(app),
      Router = require('./router.js');

app.use('/', Router());

app.listen(7611);

module.exports = app;
