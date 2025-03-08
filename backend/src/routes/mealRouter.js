const express = require('express');
const mealController = require('../controllers/mealController');

const router = express.Router();

router.get('/', mealController.getAllByUserOrPublic);

module.exports = router;
