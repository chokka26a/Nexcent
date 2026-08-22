require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001; // Using 5001 so it can run alongside server.js (5000)
const JWT_SECRET = process.env.JWT_SECRET || 'nexcent_super_secret_key';
const DB_FILE = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Helpers to handle JSON file I/O
const readDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialStructure = { nexcent_db: { users: [] } };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialStructure, null, 2));
    return initialStructure;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// User Registration Endpoint
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const dbData = readDB();
    const users = dbData.nexcent_db.users;

    // Threshold check (50 records limit)
    if (users.length >= 50) {
      return res.status(403).json({
        limitExceeded: true,
        message: 'NoSQL record threshold reached (Maximum 50 records allowed).'
      });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      created_dt: new Date().toISOString() // System ISO timestamp
    };

    users.push(newUser);
    writeDB(dbData);

    const token = jwt.sign({ id: newUser.id, email, name }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully (NoSQL)!',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, created_dt: newUser.created_dt }
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const dbData = readDB();
    const users = dbData.nexcent_db.users;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/* Deploy in a single hosting env */
/* app.get('/', (req, res) => {
  res.send('Nexcent NoSQL (JSON) Backend API is running!');
}); */



/* // Serve static React files in production
const frontendBuildPath = path.join(__dirname, '../frontend/dist'); // Adjust if dist is in same directory
app.use(express.static(frontendBuildPath));

// Catch-all handler to serve index.html for client-side routing
app.get('{*path}', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => console.log(`NoSQL Server running on port ${PORT}`)); */


// 1. Point to the compiled React build folder
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// 2. Express v5 catch-all handler for React Single-Page Application routes
app.get('{*path}', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// 3. Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));