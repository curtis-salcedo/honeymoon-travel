// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDCRLjpbFNuloyFzaHwvd94oxvPyRwySKE",
//   authDomain: "silent-nation-392514.firebaseapp.com",
//   projectId: "silent-nation-392514",
//   storageBucket: "silent-nation-392514.appspot.com",
//   messagingSenderId: "798825895928",
//   appId: "1:798825895928:web:f9e2ac10f193c3c8f5e80d",
//   measurementId: "G-TZMD7VYR13"
// };

// const analytics = getAnalytics(app);

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');
// Initialize Firebase
const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user. Mount before
// app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Eventually add protections for users to be logged in to access these routes
app.use('/api/accommodations', require('./routes/api/accommodations'));
app.use('/api/activities', require('./routes/api/activities'));
app.use('/api/addresses', require('./routes/api/addresses'));
app.use('/api/meals', require('./routes/api/meals'));
app.use('/api/travels', require('./routes/api/travels'));
app.use('/api/trips', require('./routes/api/trips'));


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
