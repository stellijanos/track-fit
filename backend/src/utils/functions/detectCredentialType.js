const detectCredentialType = (credential) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (emailRegex.test(credential)) {
        return 'email';
    } else if (phoneRegex.test(credential)) {
        return 'phone';
    } else {
        return 'invalid';
    }
};
