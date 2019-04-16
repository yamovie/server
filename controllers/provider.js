const { Provider } = require('../models');

/**
 * Returns promise to find provider based on key
 * @param {Number} key jw id
 * @return {Promise}
 */
const readOneByKey = async key => {
  const foundProvider = await Provider.findOne({ 'external_ids.jw_id': key });
  return foundProvider;
};

const insertMany = providers => Provider.insertMany(providers);

module.exports = {
  insertMany,
  readOneByKey,
};
