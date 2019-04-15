const { Provider } = require('../models');

const insertMany = providers => Provider.insertMany(providers);

module.exports = {
  insertMany,
};
