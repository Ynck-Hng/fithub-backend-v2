exports.errorCatcher = (fn) => {
    return (req,res,next) => {
        return fn(req,res,next).catch(next)
    }
}

exports.errorCollector = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
}

exports.notFound = (req,res,next) => {
    const err = new Error('Y a R');
    err.status = 404;
    next(err);
}