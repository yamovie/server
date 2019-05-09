const { Provider } = require('../models');

/**
 * Serves JSON object of all providers, if res is passed. Returns an array of
 * all providers, otherwise.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @return {(Object|Array)}
 */
const readAll = async (req, res) => {
  const allProviders = await Provider.find({});
  return res ? res.json(allProviders) : allProviders;
};

const readStream = async (req, res) => {
  const providers = await Provider.find({ 'monetization_types': 'flatrate' });
  return res.json(providers);
}

const readBuy = async (req, res) => {
  const providers = await Provider.find({ 'monetization_types': 'buy' });
  return res.json(providers);
}

const readRent = async (req, res) => {
  const providers = await Provider.find({ 'monetization_types': 'rent' });
  return res.json(providers);
}

const readFree = async (req, res) => {
  const providers = await Provider.find({ 'monetization_types': 'free' });
  return res.json(providers);
}

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
  readAll,
  // readByMonetization,
  readStream,
  readBuy,
  readRent,
  readFree,
  insertMany,
  readOneByKey,
  count,
};
