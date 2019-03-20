exports.params = {
  base: {
    params: {
      api_key: process.env.TMDB_KEY
    }
  },
  discover: Object.assign(
    {},
    {
      params: {
        region: 'us',
        year: 2018,
        sort_by: 'release_date'
      }
    }
  ),
  genres: Object.assign(
    {},
    {
      params: {
        language: 'en-US'
      }
    }
  )
};
