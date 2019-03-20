const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p/original';

const parser = {};

parser.list = movie => {
  const { id, title, poster_path, genre_ids } = movie;

  return {
    tmdb_id: id,
    title,
    poster_path: `${TMDB_POSTER_BASE_URL}${poster_path}`,
    genre_ids
  };
};

parser.details = (data, tmdb_id) => {
  const { Year, Rated, Runtime, Genre, Director, Actors, Plot, Ratings } = data;

  const ratings = Ratings.map(elem => {
    return {
      source: elem.Source,
      rating: elem.Value
    };
  });

  ratings.push({
    source: 'MPAA',
    rating: Rated
  });

  console.log(ratings);

  return {
    tmdb_id,
    release_year: Year,
    cast: Actors,
    director: Director,
    genres: Genre,
    ratings,
    plot: Plot,
    runtime: Runtime
  };
};

parser.genre = data => {
  const { name, id } = data;

  return {
    genre: name,
    tmdb_id: id
  };
};

module.exports = parser;
