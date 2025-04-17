const env = require('../config/env');

/**
 * Middleware function to handle success responses and cookie settings
 *
 * @param {Response} result - Result object passed in the next function from previous middleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
module.exports = (result, req, res, next) => {
    if (result?.name && result.name === 'PdfResponse') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}.pdf"`);
        return res.send(result.pdfBuffer);
    }

    // 1. Proceeed to next middleware if it's not a success response
    if (!result?.name || result.name !== 'SuccessResponse') return next(result);

    // 2. Return no content if status code is 204 (no content)
    if (result.statusCode === 204) return res.status(204).send();

    // 3. Retrieve refresh token from results cookies
    const { refreshToken } = result.cookies;

    // 4. Handle cookie logic if there is refresh token
    if (refreshToken) {
        // 4.1 Retrieve cookie configurations from environment variables
        const cookieConf = env.cookies.refreshToken;

        // 4.2 Define cookie options
        const options = {
            httpOnly: true,
            secure: req.secure,
            sameSite: 'Strict',
        };

        // 4.3 Delete cookie if it's named delete, otherwise set it
        if (refreshToken === 'delete') {
            res.clearCookie(cookieConf.name, '', options);
        } else {
            res.cookie(cookieConf.name, refreshToken, {
                ...options,
                maxAge: cookieConf.maxAge,
            });
        }
    }

    // 5. Return response with corresponding status code and payload
    res.status(result.statusCode).json(result.body);
};
