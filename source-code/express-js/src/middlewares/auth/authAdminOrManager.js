const authAdminOrManager = (req, res, next) => {
    console.log("hellow")
    const { userRole } = req;
    if (!userRole || (userRole !== "admin" && userRole !== 'manager')) {
        return res.status(401).json({ message: "Unauthorized request!" });
    }
    next();
};
module.exports = authAdminOrManager