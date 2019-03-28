const axios = require('axios');
const path = require('path');
const tmdb = require('./tmdb');
const omdb = require('./omdb');
const fs = require('fs');

const tmdbConfigPath = path.join(__dirname, 'tmdb', 'config.json');

exports.storeConfigurations = async () => {
  const configs = await tmdb.getConfigurations();
  configs.data.pipe(fs.createWriteStream(tmdbConfigPath));
};

exports.getMovies = async () => tmdb.discoverMovies();

exports.getDetailedMovies = async () => {
  const discovery = await tmdb.discoverMovies();

  const tmdbRequests = discovery.results.map(result =>
    tmdb.getDetailedMovieDetails(result.id),
  );

  const tmdbResponses = await axios.all(tmdbRequests);

  let movieData = tmdbResponses.map(response => response.data);

  for await (let datum of movieData) {
    datum.external_ids.tmdb_id = datum.id;

    const omdbRequest = await omdb.getMovieDetails(datum.external_ids.imdb_id);
    datum.ratings = omdbRequest.data.Ratings;
  }

  return movieData;
};

exports.getMovieDetails = async id => {
  const tmdbData = await tmdb.getMovieDetails(id);
  const omdbData = await omdb.getMovieDetails(tmdbData.external_ids.imdb_id);

  return {
    tmdbData,
    omdbData,
  };
};

exports.getGenres = async () => tmdb.getGenres();
