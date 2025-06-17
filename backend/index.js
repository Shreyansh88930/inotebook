const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo(); // Connecting to MongoDB
const app = express();
const port = 5000;

// ✅ Middleware to parse JSON
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/Auth.js'));
app.use('/api/notes', require('./routes/Notes.js'));

// ✅ Server Start
app.listen(port, () => {
    console.log(`iNotebook backend listening on http://localhost:${port}`);
});
