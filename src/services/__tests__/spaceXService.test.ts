import axios from 'axios';
import { fetchUpcomingLaunches, fetchPastLaunches, fetchLaunchpadDetails } from '../spaceXService';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SpaceX Service', () => {
  const SPACE_X_API_URL = process.env.SPACE_X_API_URL || 'https://api.spacexdata.com/v4';
  const SPACE_X_API_URL_V3 = process.env.SPACE_X_API_URL_V3 || 'https://api.spacexdata.com/v3';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUpcomingLaunches', () => {
    it('should fetch upcoming launches successfully', async () => {
      const mockData = [{ id: '1', name: 'Mission 1' }, { id: '2', name: 'Mission 2' }];
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchUpcomingLaunches();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${SPACE_X_API_URL}/launches/upcoming`);
      expect(result).toEqual(mockData);
    });

    it('should throw an error if fetching upcoming launches fails', async () => {
      const errorMessage = 'Error fetching upcoming launches';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchUpcomingLaunches()).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${SPACE_X_API_URL}/launches/upcoming`);
    });
  });

  describe('fetchPastLaunches', () => {
    it('should fetch past launches successfully', async () => {
      const mockData = [{ id: '3', name: 'Past Mission 1' }, { id: '4', name: 'Past Mission 2' }];
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchPastLaunches();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${SPACE_X_API_URL}/launches/past`);
      expect(result).toEqual(mockData);
    });

    it('should throw an error if fetching past launches fails', async () => {
      const errorMessage = 'Error fetching past launches';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchPastLaunches()).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${SPACE_X_API_URL}/launches/past`);
    });
  });

  describe('fetchLaunchpadDetails', () => {
    it('should fetch launchpad details successfully', async () => {
      const mockSiteId = 'site123';
      const mockData = { id: 'site123', name: 'Launchpad 1', location: 'Florida' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchLaunchpadDetails(mockSiteId);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${SPACE_X_API_URL_V3}/launches/${mockSiteId}`);
      expect(result).toEqual(mockData);
    });

    it('should throw an error if fetching launchpad details fails', async () => {
      const mockSiteId = 'site123';
      const errorMessage = 'Error fetching launchpad details';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchLaunchpadDetails(mockSiteId)).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${SPACE_X_API_URL_V3}/launches/${mockSiteId}`);
    });
  });
});
