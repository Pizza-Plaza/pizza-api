'use strict';

const supertest = require('supertest');
const { server } = require('../../src/server');
const { database } = require('../../src/models');
const request = supertest(server);

beforeAll(async () => {
  await database.sync();
});

afterAll(async () => {
  await database.drop();
});

describe('Testing v1 REST API', () => {
  test('Handles bad routes', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Sorry, we could not find what you were looking for');
  });

  test('Handles bad requests', async () => {
    const response = await request.post('/api/v1/horse').send({ info: 'bad' });
    expect(response.status).toEqual(500);
  });

  test('Create a new side', async () => {
    let response = await request.post('/api/v1/side').send({
      type: 'chicken wings',
      size: 'lg',
    });
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual('chicken wings');
    expect(response.body.size).toEqual('lg');
  });

  test('Read all sides', async () => {
    let response = await request.get('/api/v1/side');
    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('chicken wings');
    expect(response.body[0].size).toEqual('lg');
  });

  test('Read one side', async () => {
    let response = await request.get('/api/v1/side/1');
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('chicken wings');
    expect(response.body.size).toEqual('lg');
  });

  test('Update a side', async () => {
    let response = await request.put('/api/v1/side/1').send({
      type: 'salad',
      size: 'med',
    });
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('salad');
    expect(response.body.size).toEqual('med');
  });

  test('Delete a side', async () => {
    let response = await request.delete('/api/v1/side/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });
});
