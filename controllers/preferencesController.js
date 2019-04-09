const Preference = require('../models/preference');

/**
 * Returns all data from preferences
 * @return 
 */
const getPreferences = (req, res) => {

};


const create = (req, res) => {
  Preference.create({
    animated: req.body.animated,
    ratings: req.body.ratings,
  }, (err, preference) => {
    if (err) {
      res.json({ error: err.message });
    }
    return res.status('201').json({ message: 'Preferences has been successfully created', preference });
  });
};


// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });

  

/**
 * Returns all data from preferences
 * @return 
 */
// module.exports.update = (req, res) => {
//   res.json({ message: 'Preferences has been successfully updated' });
// };


module.exports = {
  create,
  getPreferences,
};
