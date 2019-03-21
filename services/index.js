const tmdb = require('./tmdb');
const omdb = require('./omdb');

exports.getMovies = async () => {
  return await tmdb.discoverMovies();
};

exports.getMovieDetails = async id => {
  const tmdbData = await tmdb.getMovieDetails(id);
  const omdbData = await omdb.getMovieDetails(tmdbData.external_ids.imdb_id);

  return {
    tmdbData,
    omdbData
  };
};

exports.getGenres = async () => {
  return await tmdb.getGenres();
};
