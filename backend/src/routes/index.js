const express = require('express');
const activityRouter = require('./activityRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/users/me/activitites', activityRouter);

module.exports = router;
