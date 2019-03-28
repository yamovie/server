const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_KEY
}@yamovie-4pvqd.mongodb.net/data?retryWrites=true`;

mongoose.set('debut', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;
mongoose.connect(uri, { useNewUrlParser: true }).catch(error => {
  throw new Error(error);
});

module.exports.Movie = require('./movie');
module.exports.Genre = require('./genre');
module.exports.Detail = require('./detail');
module.exports.DetailedMovie = require('./detailedMovie');
