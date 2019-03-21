module.exports = requests = {
  TMDB_NOW_PLAYING: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/movie/now_playing',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'US'
    }
  },
  TMDB_DISCOVER: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/discover/movie',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'us',
      year: 2018,
      sort_by: 'release_date'
    }
  },
  TMDB_DETAIL: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/movie',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      append_to_response: 'credits,external_ids,videos'
    }
  },
  TMDB_GENRES: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/genre/movie/list',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      language: 'en-US'
    }
  },
  OMDB_DETAIL: {
    method: 'get',
    baseURL: `http://www.omdbapi.com`,
    url: '',
    params: {
      apikey: process.env.OMDB_KEY
      // i: IMDB id
    }
  }
};