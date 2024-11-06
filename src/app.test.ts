import request from 'supertest';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import launchesRoutes from './routes/launchesRoutes';
import tweetsRoutes from './routes/tweetsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).send('Ok');
});

app.use('/api/launches', launchesRoutes);
app.use('/api/tweets', tweetsRoutes);

describe('Express App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /health', () => {
    it('should return a status of 200 and "Ok"', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Ok');
    });
  });

  describe('API Routes', () => {
    it('should handle requests to /api/launches', async () => {
      const response = await request(app).get('/api/launches/upcoming');
      expect(response.status).toBe(200);
    });

    it.skip('should handle requests to /api/tweets', async () => {
      const response = await request(app).get('/api/tweets');
      expect(response.status).toBe(200);
    });
  });

  describe('404 Handling', () => {
    it('should return a 404 for an unknown route', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.status).toBe(404);
    });
  });
});
