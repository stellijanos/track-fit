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
            `"${m.date || ''}",${m.name},${m.caloriesPerHour},${m.totalCalories},${m.durationInM}`
        );
    });

    return rows.join('\n');
};

module.exports = {
    measurements,
    activities,
};
