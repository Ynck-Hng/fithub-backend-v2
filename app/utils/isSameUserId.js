const isSameUserId = (req, res, id) => {
    if(!req.session.user || req.session.user.id !== Number(id)){
        return res.status(401).json("Unauthorized actions.");
    };
};

module.exports = isSameUserId;