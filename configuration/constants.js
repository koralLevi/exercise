
// --- redis configuration ---
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME || 'bismart-dev-1ss';
const REDIS_PORT = process.env.REDIS_PORT ||  '6379';

// --- server configuration ---
const SERVER_PORT = 8080;

// --- http status ---
const STATUS = {
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

module.exports = { REDIS_HOSTNAME, REDIS_PORT, SERVER_PORT, STATUS };
