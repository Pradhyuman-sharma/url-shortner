const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/redirect', require('./routes/index'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
