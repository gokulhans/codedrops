const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const verifyAdmin = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await Admin.findOne({ _id: decoded.adminId, email: decoded.email });

        if (!admin) {
            throw new Error();
        }

        // Attach the admin object to the request for further processing
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized to access this resource' });
    }
};

module.exports = verifyAdmin;
