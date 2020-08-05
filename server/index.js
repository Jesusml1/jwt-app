const express = require('express');
const cors = require('cors');
const app = express();

// Midleware
app.use(express.json()); // For req.body
app.use(cors());

// ROUTES //

// Register and login routes

app.use('/auth', require('./routes/jwtAuth.js'));

// Dashboard route
app.use('/dashboard', require('./routes/dashboard'));

app.listen(5000, () => {
  console.log('Server at port 5000');
});
