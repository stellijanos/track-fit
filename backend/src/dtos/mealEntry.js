module.exports = (data) => ({
    id: data._id,
    trackDay: data.trackDay,
    name: data.name,
    type: data.type,
    per100: data.per100,
    totalConsumed: data.totalConsumed,
});
