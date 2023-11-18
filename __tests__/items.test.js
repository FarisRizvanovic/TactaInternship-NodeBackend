// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');

describe('Items', () => {
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

  describe('get products route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).get(`/api/v1/items/${randomId}`);

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user exists', () => {
      it('should return a 200 status code', async () => {
        const response = await supertest(app).get(
          `/api/v1/items/${testUser._id}`,
        );

        expect(response.statusCode).toBe(200);
      });
    });
  });
});
