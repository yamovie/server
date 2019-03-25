require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const apiRoutes = require('./routes/api');
const seed = require('./utils/seed');

const app = express();

const PORT = process.env.PORT || 5000;

seed();

// Middleware
app.use(cors());
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('YaMovie Server');
});

app.use('/api', apiRoutes);

process.on('unhandledRejection', (error, promise) => {
  console.log('Unhandled Rejection at:', error.stack || error);
  console.log('Promise:', promise);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
