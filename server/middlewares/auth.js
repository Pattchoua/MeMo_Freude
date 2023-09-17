// Importing the jsonwebtoken library for working with JWTs
const jwt = require('jsonwebtoken'); 

// Getting the JWT secret from environment variable
const SECRET = process.env.JWT_SECRET; 

// Authentication middleware
const authenticate = async (req, res, next) => {
try {
    // Check if there's an access token in the cookies
    if (req.cookies.accessToken) {
        const user = await jwt.verify(req.cookies.accessToken, SECRET);
        req.user = user;
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
} catch (error) {
    next(error);
}
};



module.exports = authenticate;
