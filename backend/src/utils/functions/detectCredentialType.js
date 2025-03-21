const credentialTypes = require('../../enums/credentialTypes');

const detectCredentialType = (credential) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (emailRegex.test(credential)) {
        return credentialTypes.EMAIL;
    } else if (phoneRegex.test(credential)) {
        return credentialTypes.PHONE;
    } else {
        return credentialTypes.INVALID;
    }
};

module.exports = detectCredentialType;
