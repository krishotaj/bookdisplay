const express = require('express');
const connectDB = require('./Config/Connection');
const routes = require('./Routes/Routes');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// API routes
app.use('/api', routes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
