require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { logger, errorHandler } = require('./middleware');
const { seed } = require('./utils');
// const { seed } = require('./utils');
// const tests = require('./tests');

require('./config/passport');

// Test
// test();

const app = express();

// Seed
// seed();

app.use(cors());
// app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'Hello there!',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

// static middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler);

app.listen(process.env.PORT || 5500, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`);
});
