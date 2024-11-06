import { Request, Response } from 'express';
import { fetchUpcomingLaunches, fetchPastLaunches, fetchLaunchpadDetails } from '../services/spaceXService';

export const getUpcomingLaunches = async (req: Request, res: Response) => {
  try {
    const data = await fetchUpcomingLaunches();
    res.json(data);
  } catch (error) {
    console.error('Error fetching upcoming launches:', error);
    res.status(500).json({ error: 'Error fetching upcoming launches' });
  }
};

export const getPastLaunches = async (req: Request, res: Response) => {
  try {
    const data = await fetchPastLaunches();
    res.json(data);
  } catch (error) {
    console.error('Error fetching past launches:', error);
    res.status(500).json({ error: 'Error fetching past launches' });
  }
};

export const getLaunchpadDetails = async (req: Request, res: Response) => {
  const { site_id } = req.params;

  console.log(site_id, typeof site_id, 'site_id')
  try {
    const data = await fetchLaunchpadDetails(site_id);
    res.json(data);
  } catch (error) {
    console.error('Error fetching launchpad details:', error);
    res.status(500).json({ error: 'Error fetching launchpad details' });
  }
};
