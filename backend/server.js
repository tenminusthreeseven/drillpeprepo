const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ------------------- Routes -------------------

// Signup
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch {
        res.status(400).send('User already exists');
    }
});

// Signin
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Incorrect password');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Logged in', savedData: user.savedData });
});

// Auth middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).send('Invalid token');
    }
};

// Save progress
app.post('/save', authMiddleware, async (req, res) => {
    const { savedData } = req.body;
    await User.findByIdAndUpdate(req.user.id, { savedData });
    res.send('Progress saved');
});

// Get progress
app.get('/progress', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ savedData: user.savedData });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
