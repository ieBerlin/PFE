const { pool } = require("../../models/db/connect.js");

const deleteUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const [user] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    await pool.query("DELETE FROM users WHERE userId = ?", [userId]);

    return res
      .status(200)
      .json({ message: "User profile deleted successfully." });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteUserProfile;
