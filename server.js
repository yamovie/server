require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const apiRoutes = require('./routes/api');
const { seed } = require('./utils');
const tests = require('./tests');

const app = express();

// Test
// test();

// Seed
seed();

// Middleware
app.use(cors());
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('YaMovie Server');
});

app.use('/api', apiRoutes);

process.on('unhandledRejection', (error, promise) => {
  console.log('Unhandled Rejection at:', error.stack || error);
  console.log('Promise:', promise);
});

app.listen(process.env.PORT || 5500, () =>
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`),
);
