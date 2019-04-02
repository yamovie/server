require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const methodOverride = require('method-override');
const http = require('http');

const passport = require('passport');
// const io = require('socket.io')(server);
const { logger, errorHandler } = require('./middleware');
const apiRoutes = require('./routes/api');
const oauthRoutes = require('./routes/api');
// const { seed } = require('./utils');
// const tests = require('./tests');


require('./config/passport');

// Test
// test();

const app = express();
const server = http.Server(app);
// server.listen(80);
// Seed
// seed();

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
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
// const io = socketio.listen(server); 
// app.set('io', io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.use(errorHandler);

app.listen(process.env.PORT || 5500, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`);
});
