const services = require('../services');

module.exports = async () => {
  const movies = await services.getMovies();

  // console.log(await services.getGenres());

  const data = await services.getMovieData(movies.results);
  console.log(data.movieData);
};
