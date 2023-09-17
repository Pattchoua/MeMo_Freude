
//Importing the modules to create an intance and express Router
const express = require('express');
const router = express.Router();

// Importing functions 
const { register, login, logout, getLoggedinUser } = require('../controllers/auth');

// Importing the authenticate middelware
const authenticate = require('../middlewares/auth');

// Defining Routes using Express router
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/currentUser', authenticate, getLoggedinUser);

module.exports = router;
