const isAdmin = (req, res, next) => {
    if(!req.session.user.role === "admin"){
        return res.status(403).json("Access denied.");
    };

    next();
};

module.exports = isAdmin;