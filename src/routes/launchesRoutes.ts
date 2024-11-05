import express from 'express';
import { getUpcomingLaunches, getPastLaunches } from '../controllers/launchesController';

const router = express.Router();

router.get('/upcoming', getUpcomingLaunches);
router.get('/past', getPastLaunches);

export default router;
