// file: test/api.js
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const { connectDB } = require('../index');

describe('Login API', function() {
    before(function(done){
        connectDB;
        done();
    });
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/api/register')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send(
               {username: 'pepe',
                password: '141414',
                name: 'pedroperez',
                lastname: 'userlast',
                email:'user@1234.com',
                phone: '12345',
                adress: 'flloowl 414',
             })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});