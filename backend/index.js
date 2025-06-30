require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running!' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Complaint routes
app.use('/api/complaints', require('./routes/complaint'));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
});
