const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const activityController = require('../controllers/activityController');

const router = express.Router();

router.use(jwtMiddleware);

router.post('/', activityController.create);
router.get('/', activityController.getAllByUserorPublic);
router.patch('/:activityId', activityController.updateByUserAndId);

module.exports = router;
