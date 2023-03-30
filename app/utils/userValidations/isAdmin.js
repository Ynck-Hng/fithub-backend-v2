const isAdmin = (req, res, next) => {
    // Checks if the user is an admin
    if(!req.session.user || req.session.user.role !== "admin"){
        return res.status(403).json("Access denied.");
    };

    next();
};

module.exports = isAdmin;