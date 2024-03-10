const cors = require('cors');

const corsOptions = {
    origin: "*", // Allow requests from any origin
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: "*", // Allow all headers (for security reasons i'll fix it later. :)
};

module.exports = cors(corsOptions);