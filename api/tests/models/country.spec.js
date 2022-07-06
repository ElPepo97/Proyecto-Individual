const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Country validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should work when its a valid country', (done) => {
        Country.create({
          id: "ARG",
          name: 'Argentina',
          flag: "azul y blanca", 
          region: "América",
          capital: "Buenos Aires"
        })
          .then(() => done())
          .catch((error) => done(error));
      });

      it('should NOT work when name is null', (done) => {
        Country.create({
          id: "ARG",
          name: null,
          flag: "azul y blanca", 
          region: "América",
          capital: "Buenos Aires"
        })
          .then((res) => done(res))
          .catch(() => done());
      });
    }); 
  });
});