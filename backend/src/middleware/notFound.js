/**
 * Middleware function to handle not found routes
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
module.exports = notFoundMiddleware = (req, res) => {
    res.status(404).json({
        message: `Cannot ${req.method} ${req.originalUrl}`,
        success: false,
    });
};
