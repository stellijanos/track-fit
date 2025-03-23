const caloricTargetDto = require("./caloricTarget");
const measurementDto = require("./measurement");

module.exports = (data) => ({
    id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    birthDate: data.birthDate,
    gender: data.gender,
    height: data.height,
    role: data.role,
    isEmailVerified: data.isEmailVerified,
    isPhoneVerified: data.isPhoneVerified,
    profilePicture: data.profilePicture,
    lastMeasurement: measurementDto(data.lastMeasurement),
    currentWaterTarget: data.currentWaterTarget,
    currentCaloricTarget: caloricTargetDto(data.currentCaloricTarget),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
