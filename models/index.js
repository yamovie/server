// const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://ymvserver:${
  process.env.DB_KEY
}@yamovie-4pvqd.mongodb.net/data?retryWrites=true`;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

const mongoose = require('mongoose');
mongoose.set('debut', true);
mongoose.Promise = Promise;
mongoose.connect(uri, { useNewUrlParser: true }).catch(err => {
  throw new Error(err);
});
// module.exports.client = client;
module.exports.Movie = require('./movie');
module.exports.Genre = require('./genre');
module.exports.Detail = require('./detail');
