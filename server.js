const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');  
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // CORS middleware

// Database connection
connectDB();
app.use(express.json())
// Routes
app.use('/api/auth', authRoutes); 
// app.use('/menu', menuRoutes)
// Root route for testing
app.get('/', (req, res) => res.send('API is running'));
app.use(orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
