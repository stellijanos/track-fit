const isDateExpired = (target, comparison = new Date()) =>
    new Date(target) < new Date(comparison);

module.exports = isDateExpired;
