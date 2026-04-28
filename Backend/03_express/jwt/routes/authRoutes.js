const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const auth = require('../middleware/authMiddleware');

// show register page 
router.get('/register', (req, res) => {
    res.render('register');
})

// register user
router.post('/register', async (req, res) => {

    const {username, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username, 
        email, 
        password: hashedPassword
    })

    res.redirect('/login');
})

// show login page

router.get('/login', (req, res) => {
    res.render('login');
})

// login user

router.post('/login', async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);

    if(!match) return res.send("Wrong password");

    // create jwt token 
    const token = jwt.sign(
        { id: user._id, username: user.username},
        process.env.JWT_SECRET, 
        { expiresIn: '1d'}
    )

    // Store token in cookie
    res.cookie('token', token)

    res.redirect('/dashboard');
})

// protected route
router.get('/dashboard', auth, (req, res) => {
  res.render('dashboard', { user: req.user })
})

// logout
router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/login')
})

module.exports = router