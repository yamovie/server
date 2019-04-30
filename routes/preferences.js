const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.preference.getPreferences);
router.post('/', controllers.preference.createPreference);
router.patch('/update', controllers.preference.updatePreference);

module.exports = router;
