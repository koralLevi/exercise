const express = require('express');
const helmet = require('helmet');

module.exports = function (app) {
    app.use(helmet());
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(async function (req, res, next) { 
        // here we should implement token validation for more secure requests
        next(); 
    });
}