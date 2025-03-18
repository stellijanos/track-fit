const express = require('express');
const trackDayController = require('../controllers/trackDayController');
const activityEntryController = require('../controllers/activityEntryController');

const router = express.Router();

router.get('/', trackDayController.getAllByUserId);
router.get('/:date', trackDayController.getByDateAndUser);
router.put('/:date/water-intake', trackDayController.setWaterIntake);
router.patch('/:date/water-intake', trackDayController.addWaterIntake);

router.post('/:date/activities', activityEntryController.create);

module.exports = router;
