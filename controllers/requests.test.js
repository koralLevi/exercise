let app = require('../index');
require('./requests')(app);
const request = require('supertest');


describe('API - resource', function () {

    it('it should responds with json', function (done) {
        request(app)
            .get('/api/resource')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('it should return a success message', function (done) {
        request(app)
            .post('/api/resource')
            .send('name=john') 
            .set('Accept', 'application/json')
            .expect(200, { message: 'success' }, done);
    });
});
