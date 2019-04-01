require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { logger, errorHandler } = require('./middleware');
const { seed } = require('./utils');
const app = express();

// Seed
// seed();

app.use(cors());
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.use(errorHandler);

app.listen(process.env.PORT || 5500, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`);
});
