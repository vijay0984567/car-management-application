// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger"); // Adjust path as needed
const cors = require("cors");


// Route imports
const userRoutes = require('./routes/user'); // for login and signup
const carRoutes = require('./routes/car');   // for car management
const imageRoutes = require('./routes/image'); // for image management

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;
// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Apply routes without /api prefix
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/', imageRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
