const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p/original';

const parser = {};

parser.movie = movie => {
  const { id, title } = movie;

  return {
    id,
    title,
    poster_path: `${TMDB_POSTER_BASE_URL}${movie.poster_path}`
  };
};

parser.details = details => {
  const { release_date, genres, overview, runtime } = details;

  return {
    release_date,
    genres,
    plot: overview,
    runtime
  };
};

module.exports = parser;
