import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define custom format for logging
morgan.token('custom', (req: Request) => {
  return JSON.stringify({
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  })
})

// Use morgan middleware with the custom format
app.use(morgan(':custom'));

app.get('/health', (_req, res) => {
  res.status(200).send('Ok')
});

try {
  app.listen(PORT, () => {
    console.log(`Server is Fire at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
}
