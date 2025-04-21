const measurements = (data) => {
    const rows = ['"date","weight (kg)","body fat (%)", "skeletal muscle mass (kg)"'];
    console.log(data);

    data.forEach((m) => {
        console.log(m.date);
        rows.push(
            `"${m.date || ''}",${m.weight},${
                m.bodyFatPercentage === -1 ? '' : m.bodyFatPercentage
            },${m.skeletalMuscleMass === -1 ? '' : m.skeletalMuscleMass}`
        );
    });

    return rows.join('\n');
};

const activities = (data) => {
    const rows = ['"date","name","kcal / hour", "total calories (kcal)","Duration (m)"'];

    data.forEach((m) => {
        console.log(m.date);
        rows.push(
            `"${m.date || ''}","${m.name}",${m.caloriesPerHour},${m.totalCalories},${m.durationInM}`
        );
    });

    return rows.join('\n');
};

const meals = (data) => {
    const rows = [
        '"date","name","type", "kcal / 100g","protein / 100g","carb / 100g","fat / 100g","fibre / 100g","salt / 100g","consumed quantity (g)","consumed kcal","consumed protein (g)","consumed carb (g)","consumed fat (g)","consumed fibre (g)","consumed salt (g)",',
    ];

    data.forEach((m) => {
        console.log(m.date);
        rows.push(
            `"${m.date || ''}","${m.name}","${m.type}",${m.per100.kcal},${m.per100.protein},${
                m.per100.carb
            },${m.per100.fat},${m.per100.fibre},${m.per100.salt},${m.totalConsumed.quantity},${
                m.totalConsumed.kcal
            },${m.totalConsumed.protein},${m.totalConsumed.carb},${m.totalConsumed.fat},${
                m.totalConsumed.fibre
            },${m.totalConsumed.salt}`
        );
    });

    return rows.join('\n');
};

const caloricTargets = (data) => {
    const rows = [
        '"from","activity level","physical goal","goal speed", "kcal","protein","carb","fat","protein / kg","carb / kg","fat / kg"',
    ];

    data.forEach((c) => {
        rows.push(
            `"${c.createdAt}","${c.activityLevel}","${c.physicalGoal}","${c.goalSpeed}",${c.kcal},${c.protein},${c.carb},${c.fat},${c.proteinPerKg},${c.carbPerKg},${c.fatPerKg}`
        );
    });

    return rows.join('\n');
};

const waterIntake = (data) => {
    const rows = ['"date","quantity"'];

    data.forEach((w) => {
        w.entries.forEach((e) => {
            rows.push(`"${e.date}",${e.quantity}`);
        });
    });

    return rows.join('\n');
};

module.exports = {
    activities,
    caloricTargets,
    meals,
    measurements,
    waterIntake,
};
