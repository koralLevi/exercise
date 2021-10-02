let chai = require('chai');
let chaiHttp = require('chai-http');
let requestsController = require('./requests');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Requests test', () => {
    // beforeEach((done) => { //Before each test we empty the database

    // });
    /*
      * Test the /GET route
      */
    // describe('/GET last resource', () => {
        //   it('it should return a value', (done) => {
        //     chai.request(server)
        //         .get('/book')
        //         .end((err, res) => {
        //               res.should.have.status(200);
        //               res.body.should.be.a('array');
        //               res.body.length.should.be.eql(0);
        //           done();
        //         });
        //   });
    // });

    // describe('/POST resource', () => {
    //     it('it should return success message', (done) => {
    //         let data = {
    //             name: "Dan",
    //             lastname: "Oz"
    //         }
    //         // { message: "success" }
    //         chai.request(requestsController)
    //             .post('/api/resource')
    //             .send(data)
    //             .end((err, res) => {
    //                 console.log("postttttttttt",res)
    //                 // res.should.have.status(200);
    //                 // res.body.should.be.a('object');
    //                 // res.body.should.have.property('message');
    //                 done();
    //             });
    //         done();
    //     });

    // });

});