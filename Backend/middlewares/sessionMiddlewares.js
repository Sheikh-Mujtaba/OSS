const session = require('express-session');

const sessionMiddleware = session({
  secret: '7372',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set `true` for production (HTTPS)
});

module.exports = sessionMiddleware;
