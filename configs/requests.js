/**
 * JW - Just Watch
 * TMDB - The Movie Database
 * OMDB - Open Movie Database
 */
module.exports = {
  JW_SEARCH: {
    method: 'POST',
    baseURL: 'https://apis.justwatch.com/content/titles/en_US/popular',
    url: '',
    headers: { 'Content-Type': 'application/json' },
    data: {
      content_types: ['movie'],
      presentation_types: null,
      providers: null,
      genres: null,
      languages: 'en',
      release_year_from: 2017,
      release_year_until: 2018,
      monetization_types: null,
      min_price: null,
      max_price: null,
      scoring_filter_types: null,
      cinema_release: null,
      query: null,
      page: null,
      page_size: 20,
    },
  },
  JW_TITLE: {
    method: 'GET',
    baseURL: 'https://apis.justwatch.com/content/titles/movie/',
    url: '/locale/en_US',
  },
  JW_GENRES: {
    method: 'GET',
    baseURL: 'https://apis.justwatch.com',
    url: 'content/genres/locale/en_US',
  },
  JW_PROVIDERS: {
    method: 'GET',
    baseURL: 'https://apis.justwatch.com',
    url: 'content/providers/locale/en_US',
  },
  TMDB_CERTIFICATIONS: {
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3/certification/movie/list',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
    },
  },
  TMDB_CONFIG: {
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3/configuration',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
    },
  },
  TMDB_NOW_PLAYING: {
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3/movie/now_playing',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'US',
      // page: specify which page to query
    },
  },
  TMDB_DISCOVER: {
    method: 'GET',
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
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3/movie',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      append_to_response: 'credits,release_dates,images,videos,external_ids',
      include_image_language: 'en,null',
    },
  },
  TMDB_GENRES: {
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3/genre/movie/list',
    url: '',
    params: {
      api_key: process.env.TMDB_KEY,
      language: 'en-US',
    },
  },
  OMDB_DETAIL: {
    method: 'GET',
    baseURL: 'http://www.omdbapi.com',
    url: '',
    params: {
      apikey: process.env.OMDB_KEY,
      // i: IMDB id
    },
  },
};
