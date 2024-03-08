// Importing needed packages
const express = require('express');
const app = express();
const dotenv = require('dotenv');
// Middlewares
dotenv.config()


const port = process.env.PORT || 8080;

// Start the server 
app.listen(port, () => {
    console.log(`Server is listening to port : ${port}`)
})