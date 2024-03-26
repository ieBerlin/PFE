const authUserRole = (req, res, next) => {
    const { userRole } = req;
    if (!userRole) {
        return res.status(401).json({ message: "Unauthorized request!" });
    }
    next();
};
module.exports = authUserRole