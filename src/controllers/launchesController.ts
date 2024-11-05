import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getUpcomingLaunches = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.SPACE_X_API_URL}/launches/upcoming`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching upcoming launches' });
  }
};

export const getPastLaunches = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.SPACE_X_API_URL}/launches/past`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching past launches' });
  }
};
