// Importing needed packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const usersAuthRouter = require("./src/routes/auth.route.js");
const usersRouter = require("./src/routes/users.route.js");
const coachRouter = require("./src/routes/coaches.route.js");
const userProfileRouter = require("./src/routes/user-profile.route.js");
const membershipPlansRouter = require("./src/routes/membership-plan.route.js");
const membershipRouter = require("./src/routes/membership.route.js");
const equipmentsRouter = require("./src/routes/equipment.route.js");
const sportsRouter = require('./src/routes/sport.route.js');
const bookingsRouter = require("./src/routes/booking.route.js");
const classesRouter = require("./src/routes/class.route.js");
const notificationRouter = require("./src/routes/notification.route.js");
const { pool } = require("./src/models/db/connect.js");
const corsMiddleware = require("./src/middlewares/cors/corsConfig.js");
const transactionsRouter = require("./src/routes/transactions.route.js")
const clientsRouter = require("./src/routes/clients.route.js")
const dashboardRouter = require("./src/routes/dashboard.route.js")
const enrollementsRouter = require("./src/routes/enrollements.route.js")
const messagesRouter = require("./src/routes/messages.route.js")
const certificationRouter = require("./src/routes/certificationRouter.route.js")
    // Middlewares
dotenv.config();
app.use(express.static("./src"));
app.use(express.json());
app.use(corsMiddleware);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use("/user/auth", usersAuthRouter);
app.use('/users', usersRouter)
app.use('/coaches', coachRouter)
app.use("/equipments", equipmentsRouter);
app.use("/user/profile", userProfileRouter);
app.use("/membership-plans", membershipPlansRouter);
app.use("/membership", membershipRouter);
app.use('/booking', bookingsRouter)
app.use('/class', classesRouter);
app.use('/sport', sportsRouter);
app.use('/notification', notificationRouter);
app.use('/transactions', transactionsRouter);
app.use('/clients', clientsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/enrollements', enrollementsRouter);
app.use('/messages', messagesRouter);
app.use('/certification', certificationRouter);
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