// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');
const Shopper = require('../models/shopperModel');

describe('Shopper', () => {
  let testUser;
  let testShopper;

  beforeAll(async () => {
    testUser = await User.create({
      name: 'Test',
    });
    testShopper = await Shopper.create({
      name: 'Test Shopper',
      user: testUser._id,
    });
  });

  afterAll(async () => {
    await User.findByIdAndDelete(testUser._id);
    await Shopper.findByIdAndDelete(testShopper._id);
    await mongoose.connection.close();
  });

  describe('create shopper route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app)
          .post('/api/v1/shoppers')
          .send({ name: 'Test Shopper', userId: randomId });

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 201 status code', async () => {
        const response = await supertest(app)
          .post('/api/v1/shoppers')
          .send({ name: 'Test Shopper', userId: testUser._id });

        await Shopper.findByIdAndDelete(response.body.data.shopper._id);

        expect(response.statusCode).toBe(201);
      });
    });
  });

  describe('get all shoppers route', () => {
    it('should return a 200 status code', async () => {
      const response = await supertest(app).get('/api/v1/shoppers');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('get shoppers for user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).get(
          `/api/v1/shoppers/user/${randomId}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 200 status code', async () => {
        const response = await supertest(app).get(
          `/api/v1/shoppers/user/${testUser._id}`,
        );

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('get shoppers with items for user route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).get(
          `/api/v1/shoppers/user/${randomId}/items`,
        );

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 200 status code', async () => {
        const response = await supertest(app).get(
          `/api/v1/shoppers/user/${testUser._id}/items`,
        );

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('delete shopper route', () => {
    describe('given the shopper does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).delete(
          `/api/v1/shoppers/${randomId}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the shopper does exist', () => {
      it('should return a 204 status code', async () => {
        const response = await supertest(app).delete(
          `/api/v1/shoppers/${testShopper._id}`,
        );

        expect(response.statusCode).toBe(204);
      });
    });
  });
});
