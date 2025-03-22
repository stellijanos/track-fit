const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const measurementRouter = require('./measurementRouter');
const caloricTargetRouter = require('./caloricTargetRouter');
const trackDayRouter = require('./trackDayRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/users/me/measurements', jwtMiddleware, measurementRouter);
router.use('/users/me/caloric-targets', jwtMiddleware, caloricTargetRouter);
router.use('/users/me/track-days', jwtMiddleware, trackDayRouter);

module.exports = router;
