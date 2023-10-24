const User = require('../models/user');

const userController = {
    create: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.json({ msg: 'User created', data: newUser });
        } catch (error) {
            res.status(500).json({ msg: 'Error creating user', error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await User.find();
            res.json({ msg: 'OK', data: users });
        } catch (error) {
            res.status(500).json({ msg: 'Error fetching users', error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (user) {
                res.json({ msg: 'User found', data: user });
            } else {
                res.status(404).json({ msg: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error fetching user', error: error.message });
        }
    },
    updateById: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, { name, email, password }, { new: true });
            if (updatedUser) {
                res.json({ msg: 'User updated', data: updatedUser });
            } else {
                res.status(404).json({ msg: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error updating user', error: error.message });
        }
    },
    deleteById: async (req, res) => {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
            if (deletedUser) {
                res.json({ msg: 'User deleted', data: deletedUser });
            } else {
                res.status(404).json({ msg: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error deleting user', error: error.message });
        }
    }
};

module.exports = userController;
