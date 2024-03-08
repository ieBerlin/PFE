const { isValidEmail } = require("../../../utils/validation/emailValidation");
const { isValidPassword } = require("../../../utils/validation/passwordValidation");
const { pool } = require("../../../models/db/connect.js");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const errors = validateInputs(email, password);

  if (Object.keys(errors).length > 0) {
    return res.status(422).json(errors);
  }

  try {
    if (await adminExists(email)) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await hashPassword(password);

    await insertAdmin(email, hashedPassword);

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const validateInputs = (email, password) => {
  const errors = {};
  if (!isValidEmail(email)) {
    errors.email = "Invalid email!";
  }
  if (!isValidPassword(password)) {
    errors.password = "Invalid password!";
  }
  return errors;
};

const adminExists = async (email) => {
  const [existingAdmin] = await pool.query(
    "SELECT * FROM admin WHERE email = ?",
    [email]
  );
  return existingAdmin.length > 0;
};

const hashPassword = async (password) => {
  const saltRounds = 1;
  return await bcrypt.hash(password, saltRounds);
};

const insertAdmin = async (email, hashedPassword) => {
  const sql = "INSERT INTO admin (email, password) VALUES (?, ?)";
  const values = [email, hashedPassword];
  await pool.execute(sql, values);
};

const loginAdmin = async (req, res) => {
  // Implement login logic here
};

module.exports = {
  createAdmin,
  loginAdmin,
};
