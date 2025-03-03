const dbDefaults = Object.freeze({
    PROFILE_PICTURE: 'default.png',
    CALORIC_TARGET: {
        kcal: 2000,
        protein: 50,
        carb: 250,
        fat: 70,
        proteinPerOneKg: 1.2,
        carbPerOneKg: 2.0,
        fatPerOneKg: 0.8,
    },
    MEASUREMENT: {
        weight: 0,
        bodyFatPercentage: 0,
        skeletalMuscleMass: 0,
    },
    WATER_TARGET: {
        quantity: 2000,
    },
});

module.exports = dbDefaults;
