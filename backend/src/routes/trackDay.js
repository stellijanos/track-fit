const express = require('express');
const trackDayController = require('../controllers/trackDay');
const activityEntryController = require('../controllers/activityEntry');
const mealEntryController = require('../controllers/mealEntry');

const router = express.Router();

router.get('/', trackDayController.getAllByUserId);
router.get('/:date', trackDayController.getByDateAndUser);
router.put('/:date/water-intake', trackDayController.setWaterIntake);
router.patch('/:date/water-intake', trackDayController.addWaterIntake);

router.post('/:date/activities', activityEntryController.create);
router.get('/:date/activities', activityEntryController.getAllByUserAndDate);
router.patch('/:date/activities/:activityEntryId', activityEntryController.updateById);
router.delete('/:date/activities/:activityEntryId', activityEntryController.deleteById);

router.post('/:date/meal-entries', mealEntryController.createMany);

module.exports = router;
