const activityEntryDto = require('./activityEntry');
const mealEntryDto = require('./mealEntry');
const {waterIntakeDto} = require('./waterIntake');

module.exports = (data) => ({
    activities: data.activities.map(activityEntryDto),
    meals: data.meals.map(mealEntryDto),
    waterIntake: waterIntakeDto(data.waterIntake),
});
