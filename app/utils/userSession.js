const userSession = (req, res, next) => {
    if(req.session.user){
        res.locals.session.user = req.session.user
    }
    next();
};

module.exports = userSession;