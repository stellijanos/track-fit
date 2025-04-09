const express = require('express');
const entryController = require('../controllers/entry');
const activityEntryController = require('../controllers/activityEntry');
const mealEntryController = require('../controllers/mealEntry');
const waterIntakeController = require('../controllers/waterIntake');

const router = express.Router();

// Activity entries
router
    .route('/:date/activities')
    .post(activityEntryController.create)
    .get(activityEntryController.getAllByUserAndDate);
router
    .route('/:date/activities/:activityEntryId')
    .patch(activityEntryController.updateByIdAndDateAndUserId)
    .delete(activityEntryController.deleteByIdAndDateAndUserId);

// Meal entries
router
    .route('/:date/meals')
    .post(mealEntryController.createMany)
    .get(mealEntryController.getAllByDateAndUserId);
router
    .route('/:date/meals/:mealEntryId')
    .patch(mealEntryController.updateByIdAndDateAndUserId)
    .delete(mealEntryController.deleteByIdAndDateAndUserId);

// Water intake
router
    .route('/:date/water-intake')
    .get(waterIntakeController.getByDateAndUserId)
    .post(waterIntakeController.createEntryByDateAndUserId);

router.delete('/:date/water-intake/:entryId', waterIntakeController.deleteEntryByIdDateAndUserId);

// Entries (all of them)
router.get('/:date', entryController.getByDateAndUserId);

module.exports = router;
