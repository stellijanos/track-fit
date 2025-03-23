const male = (weight, height, age) => 10 * weight + 6.25 * height(cm) - 5 * age + 5;
const female = (weight, height, age) => 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161;

module.exports = {
    male,
    female,
};
