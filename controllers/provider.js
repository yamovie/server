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

const insertMany = providers =>
  Provider.insertMany(providers, { ordered: false });

const count = () => Provider.estimatedDocumentCount();

module.exports = {
  insertMany,
  readOneByKey,
  count,
};
