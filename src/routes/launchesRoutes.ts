import express from 'express';
import { getUpcomingLaunches, getPastLaunches, getLaunchpadDetails } from '../controllers/launchesController';

const router = express.Router();

router.get('/upcoming', getUpcomingLaunches);
router.get('/past', getPastLaunches);
router.get('/:site_id', getLaunchpadDetails);

export default router;
