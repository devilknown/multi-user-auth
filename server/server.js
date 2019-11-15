const express = require('express');
const morgan = require('morgan');
const auth = require('./routes/auth');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

if (process.env.NODE_ENV == "development") {
    app.use(cors({ origin: process.env.CLIENT_URL}));
}

app.use('/api', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Backend server running on port ${port}`))