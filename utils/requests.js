module.exports = {
  TMDB_CERTIFICATIONS: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/certification/movie/list',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
    },
  },
  TMDB_CONFIG: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/configuration',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
    },
  },
  TMDB_NOW_PLAYING: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/movie/now_playing',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'US',
      // page: specify which page to query
    },
  },
  TMDB_DISCOVER: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/discover/movie',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'US',
      language: 'en-US',
      primary_release_year: 2018,
    },
  },
  TMDB_DETAIL: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/movie',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      append_to_response: 'credits,release_dates,images,videos,external_ids',
      include_image_language: 'en,null',
    },
  },
  TMDB_GENRES: {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/genre/movie/list',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      language: 'en-US',
    },
  },
  OMDB_DETAIL: {
    method: 'get',
    baseURL: 'http://www.omdbapi.com',
    url: '',
    params: {
      apikey: process.env.OMDB_KEY,
      // i: IMDB id
    },
  },
};
