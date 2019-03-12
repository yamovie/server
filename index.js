require('dotenv').config();
const PORT = process.env.PORT || 5000;

const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=';
const TMDB_QUERY_URL =
  'https://api.themoviedb.org/3/movie/{id}?api_key={api_key}';

const express = require('express');

const tmdbRouter = require('./routes/tmdb');

const app = express();

const seedDB = require('./data/seed');
seedDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tmdb/', tmdbRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
