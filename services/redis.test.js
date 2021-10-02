const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
var sandbox = sinon.createSandbox();
var redis = require('./redis');

describe('Redis cache api test', () => {

    let mockData = { name: "no", lastname: "body" }
    let redisKey = "key1";

    context('Save method', () => {
        let redisSetStub;

        beforeEach(async () => {
            redisSetStub = sandbox.stub(redis.getClient(), 'set').resolves([mockData]);
        })

        afterEach(() => {
            sandbox.restore();
        })

        it('it should return a success', (done) => {
            redis.setConnected(true);
            redis.set(redisKey, { test: true }).then((result) => {
                expect(result).to.equal(true);
                done();
            })
        });

        it('it should return cache is down', (done) => {
            redis.setConnected(false);
            redis.set(redisKey, { test: true }).catch((error) => {
                expect(error.message).to.equal('Cache is down');
                done();
            })
        });
    })


    context('GET method', () => {
        let redisGetStub;

        beforeEach(async () => {    
            redisGetStub = sinon.stub(redis.getClient(), 'get').resolves([mockData]);
        })

        afterEach(() => {
            sandbox.restore();
        })

        // it('it should return a data from cache', (done) => {
        //     redis.setConnected(true);
        //     redis.get(redisKey).then((result) => {
        //         console.log("2222222222 result", result)
        //         // expect(result).to.deep.equal([mockData])
        //         done();
        //     })
        // });

        it('it should return cache is down', (done) => {
            redis.setConnected(false);
            redis.get(redisKey).catch((error) => {
                expect(error.message).to.equal('Cache is down');
                done();
            })
        });
    })
})