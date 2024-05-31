const { pool } = require("../../models/db/connect.js");

const updateEnrollmentRequestStatus = async (req, res,next) => {
  const { status,  userId } = req.body;
  const { requestId } = req.params;
  if (!["rejected", "confirmed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  console.log(req.body)

  try {
    const [result] = await pool.query(
      "UPDATE EnrollmentRequests SET status = ? WHERE id = ?",
      [status, requestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }
    let title;
    let message;

    if (status === "confirmed") {
      title = "Class Enrollment Request Approved";
      message =
        "Congratulations! Your class enrollment request has been approved. You're now officially enrolled in the class. Get ready to embark on a journey of learning and growth. Should you have any queries or require assistance, don't hesitate to contact us. Enjoy the class!";
    } else {
      title = "Class Enrollment Request Rejected";
      message =
        " We regret to inform you that your class enrollment request has been rejected. Unfortunately, the class is currently at full capacity. We understand your disappointment and apologize for any inconvenience caused. If you have any further questions or need assistance, please feel free to get in touch. Thank you for your understanding.";
    }
    req.body = {
      title,
      message,
      userId: userId,
    };
    next();
    // return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating enrollment request status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateEnrollmentRequestStatus;
