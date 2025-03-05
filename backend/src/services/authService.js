const env = require('./../config/env');
const bcryptUtil = require('../utils/auth/bcrypt');
const jwtUtil = require('../utils/auth/jwt');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const userRepository = require('../repositories/userRepository');

const ACCESS_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.accessToken;
const REFRESH_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.refreshToken;
const RESET_PASSWORD_TOKEN_EXPIRES_IN =
    env.auth.jwt.expiresIn.resetPasswordToken;

const getTokens = (payload) => {
    return {
        accessToken: jwtUtil.generateToken(jwtPayload, ACCESS_TOKEN_EXPIRES_IN),
        refreshToken: jwtUtil.generateToken(
            jwtPayload,
            REFRESH_TOKEN_EXPIRES_IN
        ),
    };
};

const register = async (data) => {
    const { firstName, lastName, email, phone, birthDate, password, gender } =
        data;

    const existingUser = await userRepository.getByEmailOrPhone(email, phone);
    if (existingUser) {
        throw new ErrorResponse(409, 'User already exists.');
    }

    const hashedPassword = await bcryptUtil.hashPassword(password);

    const newUser = {
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        gender,
        password: hashedPassword,
    };

    const savedUser = await userRepository.createOne(newUser);

    const jwtPayload = {
        _id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
    };

    return getTokens();
};

const login = async ({ credential, password }) => {
    const existingUser = await userRepository.getByEmailOrPhone(
        credential,
        credential
    );
    if (!existingUser) {
        throw new ErrorResponse(401, 'Invalid email or phone.');
    }

    const correctPassword = await bcryptUtil.comparePasswords(
        password,
        existingUser.password
    );

    if (!correctPassword) {
        throw new ErrorResponse(401, 'Incorrect password.');
    }

    return getTokens();
};

module.exports = {
    register,
    login,
};
