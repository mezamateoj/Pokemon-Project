/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const request = require('supertest');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
});

describe('All pokemons', () => {
  it('/pokemons should get 200', async () => {
    const response = await request(app)
      .get('/pokemons')
    expect(200)
  }
  );
});

describe('Pokemon by ID', () => {
  it('/pokemons/:id with valid id should get 200', async () => {
    const response = await request(app)
      .get('/pokemons/1')
    expect(200)
  }
  );

  it('Invalid Id: should get 404', async () => {
    const response = await request(app)
      .get('/pokemons/5000')
    expect(404)
  }
  );
});


describe('All pokemon types /types', () => {
  it('/types should get 200 and length to be 20', async () => {
    const response = await request(app)
      .get('/types')
    expect(200)
    expect(response.body).to.have.lengthOf(20)
  }
  );
});


describe('Pokemon by name ', () => {
  it('/pokemons/name?name=ditto should get 200', async () => {
    const response = await request(app)
      .get('/pokemons/name?name=ditto')
    expect(200)
  }
  );

  it('Invalid name (testName) should get 404', async () => {
    const response = await request(app)
      .get('/pokemons/name?name=testName')
    expect(404)
  }
  );
});

describe('Create Pokemon Post: /pokemons/', () => {
  it('Should add new Pokemon: expect 200', async () => {
    const pokemon = {
      name: 'Pikachu',
      image: 'test img',
      health: 35,
      attack: 55,
      defense: 40,
      speed: 90,
      types: ['electric'],
    };

    const response = await request(app)
      .post('/pokemons')
      .send(pokemon)
    expect(200)
  }
  );
});
