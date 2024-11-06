import express from 'express';
import request from 'supertest';
import launchesRouter from '../launchesRoutes';
import * as launchesController from '../../controllers/launchesController';
import { mockUpcomingLaunches } from '../../mocks/upcomingLaunchesMock';
import { mockPastLaunches } from '../../mocks/pastLaunchesMock';
import { mockLaunchpadDetails } from '../../mocks/launchpadDetails.mock';

jest.mock('../../controllers/launchesController');

const app = express();
app.use(express.json());
app.use('/api/launches', launchesRouter);

describe('Launches Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/launches/upcoming', () => {
    it('should call getUpcomingLaunches and return upcoming launches', async () => {
      jest.spyOn(launchesController, 'getUpcomingLaunches').mockImplementation(async (req, res) => {
        res.json(mockUpcomingLaunches);
      });

      const response = await request(app).get('/api/launches/upcoming');

      expect(launchesController.getUpcomingLaunches).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpcomingLaunches);
    });
  });

  describe('GET /api/launches/past', () => {
    it('should call getPastLaunches and return past launches', async () => {
      jest.spyOn(launchesController, 'getPastLaunches').mockImplementation(async (req, res) => {
        res.json(mockPastLaunches);
      });

      const response = await request(app).get('/api/launches/past');

      expect(launchesController.getPastLaunches).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPastLaunches);
    });
  });

  describe('GET /api/launches/:site_id', () => {
    it('should call getLaunchpadDetails and return launchpad details', async () => {
      const siteId = '5e9e4502f509094188566f88';

      jest.spyOn(launchesController, 'getLaunchpadDetails').mockImplementation(async (req, res) => {
        req.params = { site_id: siteId };
        res.json(mockLaunchpadDetails);
      });

      const response = await request(app).get(`/api/launches/${siteId}`);

      expect(launchesController.getLaunchpadDetails).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockLaunchpadDetails);
    });
  });
});
