const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p';

const parser = {};

parser.movie = movie => {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: `${TMDB_POSTER_BASE_URL}${movie.poster_path}`
  };
};

module.exports = parser;
