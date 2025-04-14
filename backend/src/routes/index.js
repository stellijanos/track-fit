const express = require('express');
const jwtMiddleware = require('../middleware/jwt');
const authRouter = require('./auth');
const userRouter = require('./user');
const measurementRouter = require('./measurement');
const caloricTargetRouter = require('./caloricTarget');
const entryRouter = require('./entry');
const mealPlanRouter = require('./mealPlan');
const exportRouter = require('./export');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users/me', jwtMiddleware, userRouter);
router.use('/users/me/measurements', jwtMiddleware, measurementRouter);
router.use('/users/me/caloric-targets', jwtMiddleware, caloricTargetRouter);
router.use('/users/me/entries', jwtMiddleware, entryRouter);
router.use('/users/me/meal-plans', jwtMiddleware, mealPlanRouter);
router.use('/exports', jwtMiddleware, exportRouter);

module.exports = router;
