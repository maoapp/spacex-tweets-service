import express from 'express';
import request from 'supertest';
import tweetsRouter from '../tweetsRoutes';
import * as tweetsController from '../../controllers/tweetsController';
import { mockTwitterResponse } from '../../mocks/twitterMocks';

jest.mock('../../controllers/tweetsController');

const app = express();
app.use(express.json());
app.use('/api/tweets', tweetsRouter);

describe('Tweets Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tweets', () => {
    it('should call getRecentTweets and return recent tweets', async () => {
      jest.spyOn(tweetsController, 'getRecentTweets').mockImplementation(async (req, res) => {
        res.json(mockTwitterResponse);
      });

      const response = await request(app).get('/api/tweets');

      expect(tweetsController.getRecentTweets).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTwitterResponse);
    });

    it('should return an error response if getRecentTweets fails', async () => {
      const mockError = { error: 'Failed to fetch tweets' };

      jest.spyOn(tweetsController, 'getRecentTweets').mockImplementation(async (req, res) => {
        res.status(500).json(mockError);
      });

      const response = await request(app).get('/api/tweets');

      expect(tweetsController.getRecentTweets).toHaveBeenCalled();
      expect(response.status).toBe(500);
      expect(response.body).toEqual(mockError);
    });
  });
});
