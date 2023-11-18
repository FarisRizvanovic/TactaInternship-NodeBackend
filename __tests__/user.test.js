// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');

describe('User Endpoints', () => {
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      name: 'Test',
    });
  });

  afterAll(async () => {
    await User.findByIdAndDelete(testUser._id);
    await mongoose.connection.close();
  });

  describe('create user route', () => {
    it('should return a 201 status code', async () => {
      const response = await supertest(app)
        .post('/api/v1/users')
        .send({ name: 'Test' });

      await User.findByIdAndDelete(response.body.data.user._id);

      expect(response.statusCode).toBe(201);
    });
  });

  describe('get users route', () => {
    it('should return a 200 status code', async () => {
      const response = await supertest(app).get('/api/v1/users');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('delete user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).delete(
          `/api/v1/users/${randomId}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 204 status code', async () => {
        const response = await supertest(app).delete(
          `/api/v1/users/${testUser._id}`,
        );

        expect(response.statusCode).toBe(204);
      });
    });
  });
});
