import { Request, Response } from 'express';
import { fetchRecentTweets } from '../services/twitterService';

export const getRecentTweets = async (req: Request, res: Response) => {
  try {
    const query = 'SpaceX';
    const tweets = await fetchRecentTweets(query);

    res.json(tweets);
  } catch (error) {
    console.error('Error in getRecentTweets controller:', error);

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};
