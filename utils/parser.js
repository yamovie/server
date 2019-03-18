const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p/original';

const parser = {};

parser.list = movie => {
  const { id, title } = movie;

  return {
    id,
    title,
    poster_path: `${TMDB_POSTER_BASE_URL}${movie.poster_path}`
  };
};

parser.details = data => {
  const { Year, Rated, Runtime, Genre, Director, Actors, Plot, Ratings } = data;

  const ratings = Ratings.map(elem => {
    return {
      source: elem.Source,
      rating: elem.Value
    };
  });

  return {
    release_year: Year,
    cast: Actors,
    director: Director,
    genres: Genre,
    ratings,
    plot: Plot,
    runtime: Runtime
  };
};

module.exports = parser;
