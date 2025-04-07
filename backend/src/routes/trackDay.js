const express = require('express');
const trackDayController = require('../controllers/trackDay');
const activityEntryController = require('../controllers/activityEntry');
const mealEntryController = require('../controllers/mealEntry');

const router = express.Router();

// Trackdays
router.get('/', trackDayController.getAllByUserId);
router.get('/:date', trackDayController.getByDateAndUser);

router
    .route('/:date/water-intake')
    .put(trackDayController.setWaterIntake)
    .patch(trackDayController.addWaterIntake);

// [Trackday] activity entries
router
    .route('/:date/activities')
    .post(activityEntryController.create)
    .get(activityEntryController.getAllByUserAndDate);
router
    .route('/:date/activities/:activityEntryId')
    .patch(activityEntryController.updateByIdAndTrackDayId)
    .delete(activityEntryController.deleteByIdAndTrackDayId);

// [Trackday] meal entries
router
    .route('/:date/meal-entries')
    .post(mealEntryController.getAllByTrackDayId)
    .get(mealEntryController.createMany);
router
    .route('/:date/meal-entries/:mealEntryId')
    .patch(mealEntryController.updateByIdAndTrackDayId)
    .delete(mealEntryController.deleteByIdAndTrackDayId);

module.exports = router;
