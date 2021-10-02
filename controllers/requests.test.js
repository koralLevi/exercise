let app = require('../index');
let redis = require('../services/redis');
require('./requests')(app);
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('API - resource', function () {

    let redisSetStub;
    let redisGetStub;
    let mockData = { mock: true };

    beforeEach(async () => {
        redis.setConnected(true);
        redisSetStub = sandbox.stub(redis.getClient(), 'set').resolves([mockData]);
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('POST - it should return a success message', function (done) {
        request(app)
            .post('/api/resource')
            .send('mock=john')
            .set('Accept', 'application/json')
            .expect(200, { message: 'success' }, done);
    });

    it('POST - it should return an error', function (done) {
        redis.setConnected(false);
        request(app)
            .post('/api/resource')
            .send('mock=john')
            .set('Accept', 'application/json')
            .expect(500, done);
    });

    it('GET - it should responds with json', function (done) {
        redisGetStub = sandbox.stub(redis, 'getValue').resolves([mockData]);
        request(app)
            .get('/api/resource')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET - it should return an error', function (done) {
        redis.setConnected(false);
        request(app)
            .get('/api/resource')
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});
