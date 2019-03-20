require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const apiRouter = require('./routes/api');
const seed = require('./utils/seed');

const app = express();

seed();

// Middleware
app.use(cors());
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('YaMovie Server');
});

app.use('/api', apiRouter);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
