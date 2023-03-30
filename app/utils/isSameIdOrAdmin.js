const isSameIdOrAdmin = (req, res, id) => {
    if(req.session.user.id !== id || req.session.user.role !== "admin"){
        return res.status(401).json("Authorized actions.");
    };
}

module.exports = isSameIdOrAdmin;