require('dotenv').config();
const PORT = process.env.PORT || 5005;

const express = require('express');

const logger = require('./middleware/logger');
const apiRouter = require('./routes/api');
const seed = require('./routes/seed');

const app = express();

// Seed
seed();

// Middleware
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('YaMovie Server');
});

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
