'use strict';

const supertest = require('supertest');
const { server } = require('../../src/server');
const { database } = require('../../src/models');
const request = supertest(server);

let testUser = {};
let testAdmin = {};

beforeAll(async () => {
  await database.sync();

  let userData = {
    testUser: { username: 'employee', password: 'password', role: 'employee' },
    testAdmin: { username: 'admin', password: 'password', role: 'admin' },
  };
  await request.post('/signup').send(userData.testUser);
  const responseUser = await request.post('/signin').auth(userData.testUser.username, userData.testUser.password);
  testUser = responseUser.body;

  await request.post('/signup').send(userData.testAdmin);
  const responseAdmin = await request.post('/signin').auth(userData.testAdmin.username, userData.testAdmin.password);
  testAdmin = responseAdmin.body;
});

afterAll(async () => {
  await database.drop();
});


describe('Testing v2 REST API', () => {
  test('Handles bad requests', async () => {
    const response = await request.post('/api/v2/horse').send({ info: 'bad' });
    expect(response.status).toEqual(500);
  });

  test('Prevents create a new side with wrong acl role', async () => {
    let response = await request.post('/api/v2/side').send({
      type: 'chicken wings',
      size: 'lg',
    }).set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual('Access Denied');
  });

  test('Create a new side with correct acl role', async () => {
    let response = await request.post('/api/v2/side').send({
      type: 'chicken wings',
      size: 'lg',
    }).set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual('chicken wings');
    expect(response.body.size).toEqual('lg');
  });

  test('Read all sides', async () => {
    let response = await request.get('/api/v2/side').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('chicken wings');
    expect(response.body[0].size).toEqual('lg');
  });

  test('Read one side', async () => {
    let response = await request.get('/api/v2/side/1').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('chicken wings');
    expect(response.body.size).toEqual('lg');
  });

  test('Update a side', async () => {
    let response = await request.put('/api/v2/side/1').send({
      type: 'salad',
      size: 'med',
    }).set('Authorization', `Bearer ${testAdmin.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('salad');
    expect(response.body.size).toEqual('med');
  });

  test('Delete a side', async () => {
    let response = await request.delete('/api/v2/side/1').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });
});
