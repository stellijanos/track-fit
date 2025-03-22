module.exports = (data) => ({
    id: data._id,
    weight: data.weight,
    bodyFatPercentage: data.bodyFatPercentage,
    skeletalMuscleMass: data.bodyFatPercentage,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
