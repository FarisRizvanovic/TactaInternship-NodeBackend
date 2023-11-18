// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Shopper = require('../models/shopperModel');

describe('Items', () => {
  let testUser;
  let testItem;
  let testShopper;

  beforeAll(async () => {
    testUser = await User.create({
      name: 'Test',
    });
    testItem = await Item.create({
      name: 'Test Item',
      user: testUser._id,
    });
    testShopper = await Shopper.create({
      name: 'Test Shopper',
      user: testUser._id,
    });
  });

  afterAll(async () => {
    await User.findByIdAndDelete(testUser._id);
    await Shopper.findByIdAndDelete(testShopper._id);
    await Item.findByIdAndDelete(testItem._id);
    await mongoose.connection.close();
  });

  describe('create item route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app)
          .post('/api/v1/items')
          .send({ name: 'Test Item', user: randomId });

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 201 status code', async () => {
        const response = await supertest(app)
          .post('/api/v1/items')
          .send({ name: 'Test Item', userId: testUser._id });

        console.log(response.body);
        expect(response.statusCode).toBe(201);
      });
    });
  });

  describe('get items for user route', () => {
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

  describe('add shopper to items route', () => {
    describe('given the item does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).put(
          `/api/v1/items/${randomId}/${testShopper._id}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).put(
          `/api/v1/items/${randomId}/${randomId}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given the item and user do exist', () => {
      it('should return a 200 status code', async () => {
        const response = await supertest(app).put(
          `/api/v1/items/${testItem._id}/${testShopper._id}`,
        );

        expect(response.statusCode).toBe(200);
      });
    });

    describe('given the item is added 3 times', () => {
      it('should return a 400 status code', async () => {
        await Item.findByIdAndUpdate(testItem._id, { active: false });

        const response = await supertest(app).put(
          `/api/v1/items/${testItem._id}/${testShopper._id}`,
        );

        expect(response.statusCode).toBe(400);
        await Item.findByIdAndUpdate(testItem._id, { active: true });
      });
    });
  });

  describe('remove shopper from item route', () => {
    describe('given the item does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).delete(
          `/api/v1/items/${randomId}/${testShopper._id}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });
    describe('given the shopper does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();

        const response = await supertest(app).delete(
          `/api/v1/items/${testItem._id}/${randomId}`,
        );

        expect(response.statusCode).toBe(404);
      });
    });
    describe('given the item and shopper do exist', () => {
      it('should return a 200 status code', async () => {
        const response = await supertest(app).delete(
          `/api/v1/items/${testItem._id}/${testShopper._id}`,
        );

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('get all items route', () => {
    it('should return a 200 status code', async () => {
      const response = await supertest(app).get('/api/v1/items');
      expect(response.statusCode).toBe(200);
    });
  });

  // This should be last because it deletes the item
  describe('delete item route', () => {
    describe('given the item does not exist', () => {
      it('should return a 404 status code', async () => {
        const randomId = new mongoose.Types.ObjectId();
        const response = await supertest(app).delete(
          `/api/v1/items/${randomId}`,
        );
        expect(response.statusCode).toBe(404);
      });
    });
    describe('given the item does exist', () => {
      it('should return a 204 status code', async () => {
        const response = await supertest(app).delete(
          `/api/v1/items/${testItem._id}`,
        );
        expect(response.statusCode).toBe(204);
      });
    });
  });
});
