const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    signUp: async (req, res) => {
        const { name, email, password, confirmPassword, acceptTerms } = req.body;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            acceptTerms,
        });

        try {
            // Save the user to the database
            await newUser.save();

            // Generate a JSON Web Token (JWT)
            const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY, {
                // expiresIn: '1h', // Token expiration time (e.g., 1 hour)
            });

            // Send the token and user details in the response
            res.status(201).json({ message: 'User created successfully', name, userId: newUser._id, token });
        } catch (error) {
            // Handle specific Mongoose duplicate email error
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                return res.status(400).json({ error: 'Email address is already in use' });
            }
            // Handle other errors
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    signIn: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the user with the provided email exists in the database
            const user = await User.findOne({ email });

            // If the user doesn't exist, return an error
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Verify the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // If the password is invalid, return an error
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate a JSON Web Token (JWT)
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
                // expiresIn: '1h', // Token expiration time (e.g., 1 hour)
            });

            // Send the token and user details in the response
            res.status(200).json({ message: 'Sign in successful', userId: user._id, name: user.name, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

};

module.exports = authController;
