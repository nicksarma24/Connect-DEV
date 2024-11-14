const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        // Check if token is provided
        if (!token) {
            return res.status(401).send("Please login ");
        }

        // Verify token
        const decodedObj = await jwt.verify(token, "abcdefgh");
        const { _id } = decodedObj;

        // Find user by ID from token
        const user = await User.findById(_id);
        if (!user) {
            return res.status(40).send("User not found.");
        }

        // Attach user to req object
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    userAuth,
};
