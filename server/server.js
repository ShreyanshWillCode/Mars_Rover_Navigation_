require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from the frontend URL specified in the .env file
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000', // For local development
    'https://mars-rover-navigationfrontend.vercel.app/' // Your Vercel deployed frontend
  ],
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Algorithms Import
const { bfs } = require('./algorithms/bfs');
const { dfs } = require('./algorithms/dfs');
const { dijkstra } = require('./algorithms/dijkstra');
const { astar } = require('./algorithms/astar');
const { bestFirst } = require('./algorithms/bestfirst');

// API endpoint to compute path
app.post('/path', (req, res) => {
  const { grid, start, end, algorithm } = req.body;
  let result;
  switch (algorithm) {
    case 'bfs':
      result = bfs(grid, start, end);
      break;
    case 'dfs':
      result = dfs(grid, start, end);
      break;
    case 'dijkstra':
      result = dijkstra(grid, start, end);
      break;
    case 'astar':
      result = astar(grid, start, end);
      break;
    case 'bestfirst':
      result = bestFirst(grid, start, end);
      break;
    default:
      return res.status(400).json({ error: 'Invalid algorithm' });
  }
  res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));