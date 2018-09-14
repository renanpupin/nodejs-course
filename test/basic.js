let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();

var server = require('../server.js');

describe('Test server working', (done) => {
    it('should get a server message', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done();
            });
    });
});

describe('ToDos', (done) => {
    it('should get ToDos', (done) => {
        chai.request(server)
            .get('/todo')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                expect(res.body.success).to.eql(true);
                done();
            });
    });
});