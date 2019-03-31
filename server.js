require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { logger, errorHandler } = require('./middleware');
const { seed } = require('./utils');
const server = express();

// Seed
seed();

server.use(cors());
server.use(logger);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', require('./routes'));

server.use(errorHandler);

server.listen(process.env.PORT || 5500, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`);
});
