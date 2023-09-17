
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
// Calculate the duration of one day in milliseconds
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

// Register a new user
const register = async (req, res) => {
try {
    const newUser = await User.create(req.body);
    console.log("🚀 ~ file: auth.js:13 ~ register ~ newUser:", newUser)
    const user = { 
        _id: newUser._id, 
        username: newUser.username, 
        email: newUser.email };
    
    // Generate a JWT access token with the user object as payload
    const accessToken = jwt.sign(user, SECRET);
    
    // Respond with the access token as a cookie and a JSON message
    res
    .status(201)
    .cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDayInMilliseconds),
    })
    .json({ message: 'user created!', user });
} catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
}
};

// User login
const login = async (req, res) => {
    const { email, password } = req.body;

  // Validate email and password presence
    if (!email || !password) {
    res.status(400).json({ message: 'Invalid login attempt' });
    }
    try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
        res.status(400).json({ message: 'Invalid login attempt' });
        } else {
         // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, currentUser.password);
        if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid login attempt' });
        } else {
        // Password matches, create a user object and generate a JWT access token
        const user = {
            _id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email,
        };
        const accessToken = jwt.sign(user, SECRET);  
        // Respond with the access token as a cookie and a JSON message
        res
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDayInMilliseconds),
        })
        .json({ message: 'user logged in Successfully!', user });
        }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, errors: error.errors });
    }
};

// User logout
const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.json({ message: 'user logged out Successfully' });
};


// Get logged-in user details
const getLoggedinUser = async (req, res) => {
    console.log("🚀 ~ file: auth.js:83 ~ getLoggedinUser ~ getLoggedinUser:", getLoggedinUser)
    try {
        const user = await User.findOne({ _id: req.user._id }).select('_id email username');
        console.log("🚀 ~ file: auth.js:86 ~ getLoggedinUser ~ user:", user)
        res.json({ user });
    } catch (error) {
        console.log("🚀 ~ file: auth.js:89 ~ getLoggedinUser ~ error:", error)
        res.json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    getLoggedinUser,
};