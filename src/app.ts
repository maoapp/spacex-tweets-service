import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import launchesRoutes from './routes/launchesRoutes';
import tweetsRoutes from './routes/tweetsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = ['https://spacex-tweets-app.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

// Define custom format for logging
morgan.token('custom', (req: Request) => {
  return JSON.stringify({
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

app.use(morgan(':custom'));

app.get('/health', (_req, res) => {
  res.status(200).send('Ok');
});

app.use('/api/launches', launchesRoutes);
app.use('/api/tweets', tweetsRoutes);

try {
  app.listen(PORT, () => {
    console.log(`Server is Fire at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
}
