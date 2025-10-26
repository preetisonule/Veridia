const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Therapist = require('./models/Therapist');

dotenv.config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.render('index', { name: null });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await Therapist.findOne({ email });
        if (existing) {
            return res.send('Therapist already registered.');
        }
        await Therapist.create({ name, email, password });
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.send('Error registering therapist.');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const therapist = await Therapist.findOne({ email, password });
        if (!therapist) {
            return res.send('Invalid credentials');
        }
        res.render('index', { name: therapist.name });
    } catch (err) {
        console.log(err);
        res.send('Error during login.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
