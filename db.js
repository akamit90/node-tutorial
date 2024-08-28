
const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongodb connection url
const mongoURL=process.env.MONGODB_URI;

//setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,     // to avoid deprecation warning
    useUnifiedTopology: true   // to avoid deprecation warning
});
const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected');
});
db.on('error', () => {
    console.log('MongoDB connection error');
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db