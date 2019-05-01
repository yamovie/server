const { Preference } = require('../models');

/**
 * Returns all data from preferences and sends it back to the client
 * @param userId takes a userId in order to find assosciated preferences document
 * @returns
 */
const getPreferences = (req, res) => {
  Preference.findOne({ userId: req.query.userId }, (err, preferences) => {
    if (err) {
      res.json({ error: err });
    }
    res
      .status(200)
      .json({ message: 'Preference was sucessfully retrieved', preferences });
  });
};

/**
 * Creates a new preference document
 * @returns {object} preference
 */
const createPreference = (req, res) => {
  Preference.create({}, (err, preference) => {
    if (err) {
      res.json({ error: err.message });
    }
    return res.status('201').json({
      message: 'Preferences has been successfully created',
      preference,
    });
  });
};

/**
 * Updates an existing preference document based on the userId given to the functions params.
 * @returns {object} preference
 */
const updatePreference = (req, res) => {
  const query = req.body.preferences;

  Preference.findOneAndUpdate({ userId: req.body.userId }, query, err => {
    if (err) {
      res.json({ error: err });
    }
  }).then(preference =>
    res.status('204').json({
      message: 'The preference was updated succesfully',
      data: preference,
    }),
  );
};

module.exports = {
  createPreference,
  getPreferences,
  updatePreference,
};
