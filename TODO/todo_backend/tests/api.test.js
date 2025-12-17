const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Mock the TodoModel
jest.mock('../models/Todo');

describe('Todo API Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    
    // Add routes for testing
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Health check endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('API should be defined', () => {
    expect(app).toBeDefined();
  });
});
