const session = require('express-session');

const sessionMiddleware = session({
  secret:  process.env.SESSION_SECRET, // Replace with a stronger secret for production
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true for production when using HTTPS
    maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
  }
});

module.exports = sessionMiddleware;
