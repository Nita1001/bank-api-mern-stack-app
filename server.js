const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('./config/dbConn.js')
const errorHandler = require('./middleware/errorHandler.js')
const app = express();

// Load environment config.env 
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB database
connectDb();

// Parse request body
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Server running'));
app.use('/users', require('./routes/users'));
app.use('/accounts', require('./routes/accounts'));
app.use('/transactions', require('./routes/transactions'));


// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
