const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();
const sessionMiddlewares = require('./middlewares/sessionMiddlewares');

// Middleware for parsing JSON request bodies
app.use(express.json());

// CORS setup: Allowing React frontend to make requests to this backend
app.use(cors({
    origin: 'http://localhost:3000',  // React app's origin
    credentials: true,                // Allow sending cookies (session management)
}));

// Session middleware (ensure it's correctly set up to handle sessions)
app.use(sessionMiddlewares);

// Use authRoute for any route starting with '/auth'
app.use('/auth', authRoutes);

// Start the server on a different port (8082)
const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

