const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/db.json', {
  defaultValue: { movies: [], genres: [] }
});
const db = low(adapter);

module.exports = db;
