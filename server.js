require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const apiRouter = require('./routes/api');
const seed = require('./data/seed');

const app = express();

// Seed
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

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
