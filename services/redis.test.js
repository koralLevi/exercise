const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
var sandbox = sinon.createSandbox();
var redis = require('./redis');

describe('Redis cache api test', () => {

    context('Save method', () => {
        let redisStub;
        let mockSet = { name: "no", lastname: "body" }
        
        beforeEach(async () => {
            redisStub = sandbox.stub(redis.getClient(), 'set').resolves([mockSet]);
            console.log("redisStub",redisStub.set)
        })

        afterEach(() => {
            sandbox.restore();
        })

        it('it should return a success', (done) => {
            redis.setConnected(true);

            redis.set('key1', { test: true }).then((result) => {
                console.log("0000000000 result", result)
                expect(result).to.equal(true);
                done();
            })
        });

        // working
        it('it should return cache is down', (done) => {
            redis.setConnected(false);
            redis.set('key1', { test: true }).catch((error) => {
                expect(error.message).to.equal('Cache is down');
                done();
            })
        });
    })

})