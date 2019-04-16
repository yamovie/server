const router = require('express').Router();
const preferences = require('../controllers/preferences');


router.get('/', preferences.getPreferences);
router.post('/', preferences.createPreference);
router.patch('/update', preferences.updatePreference);


module.exports = router;
