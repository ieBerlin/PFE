// Importing needed packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const usersRouter = require("./src/routes/auth.route.js");
const userProfileRouter = require("./src/routes/user-profile.route.js");
const membershipPlansRouter = require("./src/routes/membership-plan.route.js");
const feedbackRouter = require("./src/routes/feedback.route.js");
const equipmentsRouter = require("./src/routes/equipment.route.js");
const bookingsRouter = require("./src/routes/booking.route.js");
const classesRouter = require("./src/routes/class.route.js");
const { pool } = require("./src/models/db/connect.js");
const cors = require("./src/middlewares/cors/corsConfig.js");
// Middlewares
dotenv.config();
app.use(express.static("./src"));
app.use(express.json());
app.use(cors);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Authentication router
app.use("/user/auth", usersRouter);
app.use("/equipments", equipmentsRouter);
app.use("/user/profile", userProfileRouter);
app.use("/membership-plans", membershipPlansRouter);
app.use('/feedback', feedbackRouter)
app.use('/booking', bookingsRouter)
app.use('/class', classesRouter)
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, async() => {
    console.log(`Server is listening to port : ${port}`);
    try {
        const conn = await pool.getConnection();
        console.log("Connected to MySQL database successfully");
        conn.release();
        console.log("Connection published");
    } catch (error) {
        console.log("Couldn't connect with database server!")
    }
});