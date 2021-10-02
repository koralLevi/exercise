let app = require('../index');
require('./requests')(app);
const request = require('supertest');
var redis = require('../services/redis');
const sinon = require('sinon');
var sandbox = sinon.createSandbox();

describe('API - resource', function () {

    //TODO: stub on redis set
    let redisSetStub;
    let redisGetStub;
    let redisGetSpy;

    beforeEach(async () => {
        redis.setConnected(true);
        redisSetStub = sandbox.stub(redis.getClient(), 'set').resolves([{ staaaa: "mmmm" }]);
    })

    afterEach(() => {
        sandbox.restore();
        sinon.restore();
    })


    it('POST - it should return a success message', function (done) {
        request(app)
            .post('/api/resource')
            .send('name=john')
            .set('Accept', 'application/json')
            .expect(200, { message: 'success' }, done);
    });

    it('POST - it should return an error', function (done) {
        redis.setConnected(false);
        request(app)
            .post('/api/resource')
            .send('name=john')
            .set('Accept', 'application/json')
            .expect(500, done);
    });

    it('GET - it should responds with json', function (done) { //TODO: fix this - need to stub the get
        redisGetStub = sandbox.stub(redis, 'get').resolves([{ staaaa: "mmmm" }]);
        redisGetSpy = sinon.spy(redis, 'get')
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
