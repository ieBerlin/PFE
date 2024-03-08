// Importing needed packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const adminsRouter = require("./src/routes/authentication/admins/index.js");
const { pool } = require('./src/models/db/connect.js');

// Middlewares
dotenv.config();
app.use(express.static("./src"));
app.use(express.json());

// Authentication routes
app.use("/auth/admins", adminsRouter);

const port = process.env.PORT || 8080;

// Start the server
app.listen(port, async() => {
    console.log(`Server is listening to port : ${port}`);
    const conn = await pool.getConnection();
    console.log('Connected to MySQL database successfully');
    conn.release()
    console.log('Connection published')
});