// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3012;

// Connect to MongoDB (You may need to change the connection string)
mongoose.connect('mongodb://localhost:27017/crudDB', {});

// Create a user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (!err) {
            res.redirect('/');
        } else {
            console.log(err);
            res.redirect('/register');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});