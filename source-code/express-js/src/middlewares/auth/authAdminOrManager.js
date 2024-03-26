const authAdminOrManager = (req, res, next) => {
    const { userRole } = req;
    console.log(userRole)
    if (!userRole || (userRole !== "admin" && userRole !== 'manager')) {
        return res.status(401).json({ message: "Unauthorized request!" });
    }
    next();
};
module.exports = authAdminOrManager