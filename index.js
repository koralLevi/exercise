const express = require('express');
const http = require('http');

var app = express();
require('./configuration/middleware')(app);
require('./configuration/route')(app);
require('./controllers/requests')(app);

var server = http.createServer(app).listen(8080, function () {
   console.info('Server running on port: 8080')
});

