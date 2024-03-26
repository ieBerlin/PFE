const authAdmin = (req, res, next) => {
    const { userRole } = req;
    if (!userRole || userRole !== "admin") {
        return res.status(401).json({ message: "Unauthorized request!" });
    }
    next();
};
module.exports = authAdmin