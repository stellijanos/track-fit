const express = require('express');
const trackDayController = require('../controllers/trackDayController');

const router = express.Router();

router.get('/:date', trackDayController.getByDate);

module.exports = router;
