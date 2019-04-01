const axios = require('axios');
const tmdb = require('./tmdb');
const omdb = require('./omdb');

exports.getMovies = async () => {
  const nowPlayingResponse = await tmdb.requestNowPlayingMovies();
  return nowPlayingResponse.data;
};

exports.getMovieData = async movies => {
  const configResponse = await tmdb.requestConfigurations();
  const configData = configResponse.data;

  const tmdbRequests = movies.map(movie => tmdb.requestMovieDetails(movie.id));
  const tmdbResponses = await axios.all(tmdbRequests);

  let movieData = tmdbResponses.map(response => response.data);

  for await (let datum of movieData) {
    const omdbResponse = await omdb.requestMovieDetails(
      datum.external_ids.imdb_id,
    );
    datum.ratings = omdbResponse.data.Ratings;
    datum.external_ids.tmdb_id = datum.id;
  }

  return { movieData, configData };
};

exports.getGenres = async () => {
  const genreResponse = await tmdb.requestGenres();
  return genreResponse.data;
};
