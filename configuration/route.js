
const Status = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
}

module.exports = function (app) {
    // catch unrecognize url.
    // app.get('*', function (req, res) { res.status(Status.NOT_FOUND).json({ error: 'Invalid GET request' }) });
    // app.post('*', function (req, res) { res.status(Status.NOT_FOUND).json({ error: 'Invalid POST request' }) });
    // app.delete('*', function (req, res) { res.status(Status.NOT_FOUND).json({ error: 'Invalid DELETE request' }) });
};
