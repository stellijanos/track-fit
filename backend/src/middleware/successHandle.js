const env = require('../config/env');

module.exports = (result, req, res, next) => {
    if (!result?.name || result.name !== 'SuccessResponse') return next(result);

    if (result.statusCode === 204) return res.status(204).send();

    const { refreshToken } = result.cookies;
    if (refreshToken) {
        const cookieConf = env.cookies.refreshToken;

        res.cookie(cookieConf.name, refreshToken, {
            httpOnly: true,
            secure: req.secure,
            sameSite: 'Strict',
            maxAge: cookieConf.maxAge,
        });
    }
    res.status(result.statusCode).json(result.body);
};
