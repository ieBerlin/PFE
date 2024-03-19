// Importing needed packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const usersRouter = require("./src/routes/authentication/index.js");
const userProfileRouter = require("./src/routes/userProfile/index.js");
const membershipPlansRouter = require("./src/routes/membershipPlan/index.js");
const feedbackRouter = require("./src/routes/feedback/index.js");
const { pool } = require("./src/models/db/connect.js");
const cors = require("./src/middlewares/cors/corsConfig.js");
// Middlewares
dotenv.config();
app.use(express.static("./src"));
app.use(express.json());
app.use(cors);
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
// Authentication router
app.use("/auth/users", usersRouter);
app.use("/user/profile", userProfileRouter);
app.use("/membership-plans", membershipPlansRouter);
app.use('/feedback', feedbackRouter)
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, async() => {
    console.log(`Server is listening to port : ${port}`);
    const conn = await pool.getConnection();
    console.log("Connected to MySQL database successfully");
    conn.release();
    console.log("Connection published");
});