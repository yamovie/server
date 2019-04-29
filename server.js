require('dotenv').config();
require('./configs/passport');
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { logger, errorhandler } = require('./middleware');

const app = express();

const { SEED, SEED_SOURCE } = process.env;

if (SEED === 'true') require('./utils').seed(SEED_SOURCE);

app.use(cors());
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

app.use(errorhandler);

app.listen(process.env.PORT || 5500, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`);
});
