/**
 * Respond to client with corresponding statuscode and payload
 *
 * @param {Error} err - Error object that was thrown or returned in previous next function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
module.exports = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        data: err.data,
        success: false,
    });
};
