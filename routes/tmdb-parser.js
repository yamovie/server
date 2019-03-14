const TMDB_POSTER_BASE_URL = 'http://image.tmdb.org/t/p';

const parser = {};

parser.movie = movie => {
  const { id, title } = movie;

  return {
    id,
    title,
    poster_path: `${TMDB_POSTER_BASE_URL}${movie.poster_path}`
  };
};

/** Movie data schema:
 * releaseYear: Number
 * cast: String array (TODO: MISSING)
 * director: String (TODO: MISSING)
 * tags: Object (TODO: MISSING)
 *    genres: String array
 *    moods: String array (TODO: MISSING)
 * ratings: Object (TODO: MISSING)
 *    mpaa: String
 *    rottenTomatoes: Object
 *      score: String
 *      link: String
 *    imdb: Object
 *      score: Number
 *      link: String
 * plot: String
 * trailerUrl: String
 * quotes: String array
 * runtime: Number (in minutes)
 * streams: Object
 *    netflix: String
 *    hulu: String
 *    amazon: String
 *    youtube: String
 *    theaters: String
 */

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
