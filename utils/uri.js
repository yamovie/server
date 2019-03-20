module.exports = uri = {
  TMDB_DISCOVER: {
    method: 'get',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'us',
      year: 2018,
      sort_by: 'release_date'
    }
  },
  TMDB_DETAIL: {
    method: 'get',
    url: 'https://api.themoviedb.org/3/movie/',
    params: {
      api_key: process.env.TMDB_KEY
    }
  },
  TMDB_GENRES: {
    method: 'get',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    params: {
      language: 'en-US',
      api_key: process.env.TMDB_KEY
    }
  },
  OMDB_MOVIE: {
    method: 'get',
    url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=`,
    params: {}
  }
};
