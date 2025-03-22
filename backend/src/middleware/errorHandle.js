module.exports = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        data: err.data,
        success: false,
    });
};
