const options = {};

options.init = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs: {
    api_key: process.env.TMDB_KEY,
    region: 'US',
    language: 'en-US',
    primary_release_year: 2018,
    sort_by: 'vote_average.desc',
    page: 1
  },
  json: true,
  body: '{}'
};

options.genres = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  qs: {
    language: 'en-US',
    api_key: process.env.TMDB_KEY
  },
  json: true,
  body: '{}'
};

module.exports = options;
