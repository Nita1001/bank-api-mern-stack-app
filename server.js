const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./config/dbConn.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

// Load environment config.env 
dotenv.config({ path: './config/config.env' });

// Serve static files from the client's build directory
app.use("/", express.static("client/dist"));

// Parse request body
app.use(express.json());

// Routes
app.get('/api', (req, res) => res.send('Server running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/transactions', require('./routes/transactions'));

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before listening 
connectDb().then(() => {
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
})


