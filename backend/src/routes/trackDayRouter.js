const express = require('express');
const trackDayController = require('../controllers/trackDayController');

const router = express.Router();

router.get('/:date', trackDayController.getByDateAndUser);
router.put('/:date/water-intake', trackDayController.setWaterIntake);
router.patch('/:date/water-intake', trackDayController.addWaterIntake);

module.exports = router;
