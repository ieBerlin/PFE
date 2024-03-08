const { isValidEmail } = require("../../../utils/validation/emailValidation");
const {
    isValidPassword,
} = require("../../../utils/validation/passwordValidation");
const {
    query
} = require('../../../models/db/connect.js');
const mysql = require('mysql2');
const createAdmin = async(req, res) => {
    const { email, password } = req.body;
    let errors = {};

    if (!isValidEmail(email)) {
        errors.email = "invalid email!";
    }
    if (!isValidPassword(password)) {
        errors.password = "invalid password!";
    }
    if (Object.keys(errors).length > 0) {
        return res.status(422).send(errors);
    }
    const sql = 'SELECT * FROM admin WHERE email = ?';
    const values = [email];
    try {

        const mysqlRes = query(sql, values);
        console.log(mysqlRes)
    } catch (
        err

    ) {
        console.log(err)
    }

    return res.status(201).send({ message: "Admin created successfully" });
};
const loginAdmin = async(req, res) => {};
module.exports = {
    createAdmin,
    loginAdmin,
};