module.exports = notFoundMiddleware = (req, res) => {
    res.status(404).json({
        message: `Cannot ${req.method} ${req.originalUrl}`,
        success: false,
    });
};
