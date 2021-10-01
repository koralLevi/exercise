const express = require('express');

module.exports = function (app) {
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(async function (req, res, next) { next(); });
}