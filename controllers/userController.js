const User = require('../models/user');


module.exports.findOne = (req, res) => {
  User.find({ googleId: req.params.id }).then(userData => res.json(userData));
};


// module.exports.login = async (req, res) {

// }
