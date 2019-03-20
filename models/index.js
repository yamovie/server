const uri = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_KEY
}@yamovie-4pvqd.mongodb.net/data?retryWrites=true`;

const mongoose = require('mongoose');
mongoose.set('debut', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;
mongoose.connect(uri, { useNewUrlParser: true }).catch(err => {
  throw new Error(err);
});

module.exports.Movie = require('./movie');
module.exports.Genre = require('./genre');
module.exports.Detail = require('./detail');
