var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('Server', function() {
  it('should return the homepage on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  it('should return an object{unix, natural} on /<date> GET', function(done) {
    chai.request(server)
      .get('/1234567890')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should return a 404 for any other path', function(done) {
    chai.request(server)
      .get('/foo/barr')
      .end(function(err, res) {
        res.should.have.status(404);
        done();
      });
  });
});
