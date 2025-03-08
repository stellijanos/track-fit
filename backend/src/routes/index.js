const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const activityRouter = require('./activityRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const mealRouter = require('./mealRouter');
const measurementRouter = require('./measurementRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/users/me/activitites', activityRouter);
router.use('/users/me/meals', mealRouter);
router.use('/users/me/measurements', jwtMiddleware, measurementRouter);

module.exports = router;
