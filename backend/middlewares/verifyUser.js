const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY; // Replace with a secure secret key

const verifyUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, secretKey);
        // If verification is successful, attach the user data to the request object
        req.user = decoded;
        next(); // Proceed to the protected route
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = verifyUser;
