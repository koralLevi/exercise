const { STATUS } = require('../configuration/constants');

module.exports = function (app) {
    // catch unrecognize url.
    app.get('*', function (req, res) { res.status(STATUS.NOT_FOUND).json({ error: 'Invalid GET request' }) });
    app.post('*', function (req, res) { res.status(STATUS.NOT_FOUND).json({ error: 'Invalid POST request' }) });
};
