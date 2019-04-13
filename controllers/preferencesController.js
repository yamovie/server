const jwt = require('jsonwebtoken');
const Preference = require('../models/preference');


/**
 * Returns all data from preferences
 * @return 
 */
const getPreferences = (req, res) => {
  Preference.findOne({ user: req.query.userId },
    (err, preferences) => {
      if (err) {
        res.json({ error: err });
      }
      res.status(200).json({ message: 'Preference was sucessfully retrieved', preferences });
    });
};


const createPreference = (req, res) => {
  Preference.create({}, (err, preference) => {
    if (err) {
      res.json({ error: err.message });
    }
    return res.status('201').json({ message: 'Preferences has been successfully created', preference });
  });
};


const updatePreference = (req, res) => {
  const query = req.body.preferences;


  Preference.findOneAndUpdate({ user: req.body.userId }, query, (err) => {
    if (err) {
      res.json({ error: err });
    }
  })
    .then(preference => res.status('204').json({ message: 'The preference was updated succesfully', data: preference }));
};
  
/**
 * Returns all data from preferences
 * @return 
 */
// module.exports.update = (req, res) => {
//   res.json({ message: 'Preferences has been successfully updated' });
// };


module.exports = {
  createPreference,
  getPreferences,
  updatePreference,
};
