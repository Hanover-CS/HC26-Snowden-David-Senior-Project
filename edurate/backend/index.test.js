/**
 * index.test.js
 * 
 * Integration tests for backend API endpoints.
 * Tests actual route handling, database interactions, and input validation.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import courseRoutes from './routes/courses.js';

// Create test app instance
const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "EduRate API",
    version: "1.0.0",
    status: "running"
  });
});

// Mount course routes
app.use('/api/courses', courseRoutes);

describe('Backend API Tests', () => {
  it('should return API info on root endpoint', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('EduRate API');
    expect(response.body.version).toBe('1.0.0');
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/nonexistent');
    
    expect(response.status).toBe(404);
  });
});

describe('API Routes Integration Tests', () => {
  
  describe('GET /api/courses', () => {
    it('should return list of courses with ratings', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      
      // Check structure of first course if any exist
      if (response.body.data.length > 0) {
        const course = response.body.data[0];
        expect(course).toHaveProperty('id');
        expect(course).toHaveProperty('Course_name');
        expect(course).toHaveProperty('rating');
        expect(course).toHaveProperty('numReviews');
      }
    });
  });

  describe('GET /api/courses/:id', () => {
    it('should return a single course with rating', async () => {
      const response = await request(app)
        .get('/api/courses/1')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('rating');
      expect(response.body.data).toHaveProperty('numReviews');
    });

    it('should return 404 for non-existent course', async () => {
      const response = await request(app)
        .get('/api/courses/99999')
        .expect(404);
      
      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/courses/:id/reviews', () => {
    it('should return reviews for a course', async () => {
      const response = await request(app)
        .get('/api/courses/1/reviews')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});

describe('Review Validation Tests', () => {
  it('should reject review with missing rating', async () => {
    const response = await request(app)
      .post('/api/courses/1/reviews')
      .send({
        comment: 'Great course but no rating provided'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('required');
  });

  it('should reject review with invalid rating (too high)', async () => {
    const response = await request(app)
      .post('/api/courses/1/reviews')
      .send({
        rating: 10,
        comment: 'Invalid rating value'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('between 1 and 5');
  });

  it('should reject review with invalid rating (too low)', async () => {
    const response = await request(app)
      .post('/api/courses/1/reviews')
      .send({
        rating: 0,
        comment: 'Invalid rating value'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('between 1 and 5');
  });

  it('should reject review with missing comment', async () => {
    const response = await request(app)
      .post('/api/courses/1/reviews')
      .send({
        rating: 5
      });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('required');
  });

  it('should create a new review with valid data', async () => {
    const newReview = {
      rating: 5,
      comment: 'Automated test review - excellent course!',
      student_name: 'Test Student'
    };

    const response = await request(app)
      .post('/api/courses/1/reviews')
      .send(newReview)
      .expect(201);
    
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.rating).toBe(5);
    expect(response.body.data.comment).toBe('Automated test review - excellent course!');
  });
});

describe('Vote System Tests', () => {
  let testReviewId;

  // Get a review ID for testing votes
  beforeAll(async () => {
    const response = await request(app).get('/api/courses/1/reviews');
    if (response.body.data && response.body.data.length > 0) {
      testReviewId = response.body.data[0].id;
    }
  });

  it('should increment upvote count', async () => {
    if (!testReviewId) {
      console.log('Skipping upvote test - no reviews available');
      return;
    }

    const response = await request(app)
      .post(`/api/courses/1/reviews/${testReviewId}/upvote`)
      .expect(200);
    
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('upvotes');
  });

  it('should increment downvote count', async () => {
    if (!testReviewId) {
      console.log('Skipping downvote test - no reviews available');
      return;
    }

    const response = await request(app)
      .post(`/api/courses/1/reviews/${testReviewId}/downvote`)
      .expect(200);
    
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('downvotes');
  });
});