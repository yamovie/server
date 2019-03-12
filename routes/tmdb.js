const request = require('request');
const express = require('express');
const router = express.Router();

const discoverMoviesOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs: {
    api_key: process.env.TMDB_KEY
  },
  body: '{}'
};

const searchMoviesOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  qs: {
    api_key: process.env.TMDB_KEY
  },
  body: '{}'
};

router.get('/:query', (req, res) => {
  console.log(req.params.query);
});

// request(options, (err, res, body) => {
//   if (error) throw new Error(err);

//   console.log(body);
// });

module.exports = router;
