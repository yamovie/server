require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const socketio = require('socket.io');
const logger = require('./middleware/logger');
const apiRoutes = require('./routes/api');
const oauthRoutes = require('./routes/api');
const seed = require('./utils/seed');
const { seed } = require('./utils');
const tests = require('./tests');

require('./config/passport');

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

app.use(session({
  secret: 'Hello there!',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(app);
app.set('io', io);

app.get('/', (req, res) => {
  res.send('YaMovie Server');
});

app.use('/api', apiRoutes);
app.use('/auth', oauthRoutes);

process.on('unhandledRejection', (error, promise) => {
  console.log('Unhandled Rejection at:', error.stack || error);
  console.log('Promise:', promise);
});

app.listen(process.env.PORT || 5500, () =>
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`),
);
