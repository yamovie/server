// const jw = require('../services/justwatch');
const jw = require('../services/justwatch');

const tests = async () => {
  const query = '';
  const res = await jw.requestMovies(query);
  console.log(res.data);

  // const url = 'https://apis.justwatch.com/content/titles/en_US/popular';
  // const data = {
  //   content_types: ['movie'],
  //   presentation_types: null,
  //   providers: null,
  //   genres: null,
  //   languages: 'en',
  //   release_year_from: 2017,
  //   release_year_until: 2018,
  //   monetization_types: null,
  //   min_price: null,
  //   max_price: null,
  //   scoring_filter_types: null,
  //   cinema_release: null,
  //   query: 'spiderman',
  //   page: null,
  //   page_size: null,
  // };
  // const req = axios({
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   data,
  //   url,
  // });
  // req.then(res => console.log(res)).catch(error => console.log(error.response));
};

module.exports = tests;
