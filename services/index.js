const axios = require('axios');
const tmdb = require('./tmdb');
const omdb = require('./omdb');
const jw = require('./justwatch');

const updateConfigurations = async () => {
  const configResponse = await tmdb.requestConfigurations();
  return configResponse.data;
};

const getMovies = async page => (await jw.requestMovies(page)).data;

const getMoviesData = async movies => {
  const requests = movies.map(movie => jw.requestData(movie.id));
  const responses = await axios.all(requests);
  const data = responses.map(res => res.data);
  return data;
};

const _getMovies = async page => {
  const certResponse = await tmdb.getMovies();
  return certResponse.data;
};

const _getMoviesData = async movies => {
  const tmdbRequests = movies.map(movie => tmdb.requestMovieDetails(movie.id));
  const tmdbResponses = await axios.all(tmdbRequests);

  let movieData = tmdbResponses.map(response => response.data);

  for await (let datum of movieData) {
    datum.external_ids.tmdb_id = datum.id;

    if (datum.external_ids.imdb_id) {
      const omdbResponse = await omdb.requestMovieDetails(
        datum.external_ids.imdb_id,
      );

      datum.ratings = omdbResponse.data.Ratings;
    }
  }

  return movieData;
};

const getGenres = async () => {
  const genreResponse = await tmdb.requestGenres();
  return genreResponse.data;
};

module.exports = {
  updateConfigurations,
  getMovies,
  getMoviesData,
  getGenres,
};
