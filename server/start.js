'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.status(200).send('Ascend!');
});

// Start the server
var server = app.listen(process.env.PORT || '45615', function () {
  console.log('App listening on port %s', server.address().port);
});
