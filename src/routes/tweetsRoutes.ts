import express from 'express';
import { getRecentTweets } from '../controllers/tweetsController';

const router = express.Router();

router.get('/', getRecentTweets);

export default router;
