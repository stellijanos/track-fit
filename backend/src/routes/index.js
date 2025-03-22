const express = require('express');
const jwtMiddleware = require('../middleware/jwt');
const authRouter = require('./auth');
const userRouter = require('./user');
const measurementRouter = require('./measurement');
const caloricTargetRouter = require('./caloricTarget');
const trackDayRouter = require('./trackDay');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/users/me/measurements', jwtMiddleware, measurementRouter);
router.use('/users/me/caloric-targets', jwtMiddleware, caloricTargetRouter);
router.use('/users/me/track-days', jwtMiddleware, trackDayRouter);

module.exports = router;
