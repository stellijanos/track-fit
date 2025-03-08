const express = require('express');
const activityRouter = require('./activityRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const mealRouter = require('./mealRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/users/me/activitites', activityRouter);
router.use('/users/me/meals', mealRouter);

module.exports = router;
