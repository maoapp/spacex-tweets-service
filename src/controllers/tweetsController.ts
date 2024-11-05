import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const TWITTER_API_URL = `${process.env.TWITTER_HOST}/2/tweets/search/recent`;
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN || '';

export const getRecentTweets = async (req: Request, res: Response) => {
  try {
    const query = 'SpaceX OR rocket OR launch';
    const response = await axios.get(TWITTER_API_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        query,
        'tweet.fields': 'created_at,text,author_id',
        max_results: 10,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data || 'Error fetching tweets from Twitter API'
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
};
