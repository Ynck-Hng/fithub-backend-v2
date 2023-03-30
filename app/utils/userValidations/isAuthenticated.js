const isAuthenticated = (req, res, next) => {
    if(!req.session.user){
        return res.status(403).json("Access denied, user must be logged in.");
    };

    next();
}

module.exports = isAuthenticated;