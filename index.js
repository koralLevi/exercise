require('dotenv').config()
const express = require('express');
const http = require('http');
const { SERVER_PORT } = require('./configuration/constants');

var app = express();
require('./configuration/middleware')(app);
require('./controllers/requests')(app);
require('./configuration/route')(app);
require('./services/redis').initRedisConnection();

var server = http.createServer(app).listen(SERVER_PORT, function () {
   console.info(`Server running on port: ${SERVER_PORT}`);
});

module.exports = app; // for testing

