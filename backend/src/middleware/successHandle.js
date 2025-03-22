module.exports = (result, req, res, next) => {
    if (!result?.name || result.name !== 'SuccessResponse') return next(result);

    if (result.statusCode === 204) return res.status(204).send();

    res.status(result.statusCode).json(result.body);
};
