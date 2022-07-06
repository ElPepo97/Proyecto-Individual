/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../../src/app.js');

const { Country, conn } = require('../../src/db.js');

chai.should();
chai.use(chaiHTTP);


const country1 = {
  id: "ARG",
  name: "Argentina",
  flag: "azul y blanca", 
  region: "América",
  capital: "Buenos Aires"
};
const country2 = {
  id: "BRA",
  name: "Brazil",
  flag: "Verde Amarella", 
  region: "América",
  capital: "Brasilia"
};

describe('/countries', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country1))
    .then(() => Country.create(country2)));

  describe('GET /countries', () => {
    it('Should GET all the countries', (done) => {
      chai.request(app)
        .get('/countries')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.equal(2);
        done();
        });
    });

    it('Should NOT GET all the countries', (done) => {
      chai.request(app)
        .get('/countrie')
        .end((err, response) => {
          response.should.have.status(404);
        done();
        });
    });
  });


  describe('GET /countries/:idPais', () => {
    it('Should GET the countrie by ID', (done) => {
      const countryID = 'ARG'
      chai.request(app)
        .get('/countries/' + countryID)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.equal(1);
        done();
        })
    })

    it('Should NOT GET the countrie by ID', (done) => {
      chai.request(app)
        .get('/countries/CHN')
        .end((err, response) => {
          response.should.have.status(404);
        done();
        })
    })
  });
});