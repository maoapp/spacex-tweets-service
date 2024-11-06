import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SPACE_X_API_URL = process.env.SPACE_X_API_URL || '';
const SPACE_X_API_URL_V3 = process.env.SPACE_X_API_URL_V3 || '';

export const fetchUpcomingLaunches = async () => {
  const response = await axios.get(`${SPACE_X_API_URL}/launches/upcoming`);
  return response.data;
};

export const fetchPastLaunches = async () => {
  const response = await axios.get(`${SPACE_X_API_URL}/launches/past`);
  return response.data;
};

export const fetchLaunchpadDetails = async (siteId: string) => {
  console.log(`${SPACE_X_API_URL_V3}/launches/${siteId}`, 'entra aqui')

  const response = await axios.get(`${SPACE_X_API_URL_V3}/launches/${siteId}`);
  return response.data;
};
