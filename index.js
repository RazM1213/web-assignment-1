import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

await MongoDatabase.connect();

app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: MongoDatabase.isConnected() ? 'Connected' : 'Disconnected'
  };
  
  const statusCode = MongoDatabase.isConnected() ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});