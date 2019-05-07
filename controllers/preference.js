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
const updatePreference = async (req, res) => {
  const query = req.body.preferences;
  const userId = req.body.userId;
  try {
    Preference.findOneAndUpdate({ userId }, query, (err, something) => {
      res.status(200).json({message: 'Preferences successfully updated!'})
    });
  }
  catch (e){
    res.status(304).json({error: "Oops, something went wrong and the preference was not updated."})
  }
};
 


module.exports = {
  createPreference,
  getPreferences,
  updatePreference,
};
