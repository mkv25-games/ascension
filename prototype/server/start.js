'use strict';

const express = require('express');
const endpoints = require('./lib/endpoints');
const app = express();

app.get('/', function (req, res) {
  res.status(200).send('Ascend!');
});

app.get('/world/generate/', [endpoints.generateWorld]);
app.get('/world/generate/:width/:height/', [endpoints.generateWorld]);
app.get('/world/generate/:width/:height/:seed', [endpoints.generateWorld]);

app.get('/area/generate/:areaCode', [endpoints.generateArea]);

// Start the server
var server = app.listen(process.env.PORT || '45615', function () {
  console.log('App listening on port %s', server.address().port);
});
