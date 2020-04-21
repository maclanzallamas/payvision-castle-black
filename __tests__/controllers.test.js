const request = require('supertest');
const app = require('../app');


describe('Player endpoints', () => {
  it('get all players', async (done) => {
    const res = await request(app)
      .get('/api/players')
      .set({ 'Authorization': 'Basic bWFyaW86bWFyaW8xMjM=', Accept: 'application/json' })
    expect(res.statusCode).toEqual(200);
    done();
  })

  it('create player', async (done) => {
    const res = await request(app)
      .post('/api/player')
      .send({
        name: "Mario Test",
        age: 13,
    })
      .set({ 'Authorization': 'Basic bWFyaW86bWFyaW8xMjM=', Accept: 'application/json', 'Content-Type': 'application/json' })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({
      id: 5,
      name: "Mario Test",
      age: 13,
      health: 100,
      bag: []
    })
    done();
  })
})

describe('Object endpoints', () => {
  it('get object by id', async (done) => {
    const res = await request(app)
      .get('/api/object/2')
      .set({ 'Authorization': 'Basic bWFyaW86bWFyaW8xMjM=', Accept: 'application/json' })
    expect(res.statusCode).toEqual(200);
    done();
  })

  it('get object by id - 404', async (done) => {
    const res = await request(app)
      .get('/api/object/7')
      .set({ 'Authorization': 'Basic bWFyaW86bWFyaW8xMjM=', Accept: 'application/json' })
    expect(res.statusCode).toEqual(404);
    done();
  })
})