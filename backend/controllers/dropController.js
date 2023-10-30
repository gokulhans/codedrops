const Drop = require('../models/drop');
const User = require('../models/user'); // Import the User model if not already imported

const dropController = {
    create: async (req, res) => {
        try {
            const { dropname, dropbody, tags, user, slug } = req.body;

            // Check if the user with the specified ID exists
            const existingUser = await User.findById(user);
            if (!existingUser) {
                return res.status(404).json({ msg: 'User not found' });
            }

            // Create a new drop associated with the user
            const newDrop = new Drop({ dropname, dropbody, tags, user, slug });
            await newDrop.save();

            res.json({ msg: 'Drop created', data: newDrop });
        } catch (error) {
            res.status(500).json({ msg: 'Error creating drop', error: error.message });
        }
    },

    updateById: async (req, res) => {
        try {
            const { dropname, dropbody, tags, user, slug } = req.body;
            const updatedDrop = await Drop.findOneAndUpdate(
                { _id: req.params.id },
                { dropname, dropbody, tags, user, slug },
                { new: true }
            );

            if (updatedDrop) {
                res.json({ msg: 'Drop updated', data: updatedDrop });
            } else {
                res.status(404).json({ msg: 'Drop not found' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error updating drop', error: error.message });
        }
    },

    getAllDropsByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const drops = await Drop.find({ user: userId }).populate('user', 'name'); // Populate the 'user' field with the 'name' property
            res.json({ msg: 'Drops found for the user', data: drops });
        } catch (error) {
            res.status(500).json({ msg: 'Error fetching drops for the user', error: error.message });
        }
    },

    getAllDropsByTag: async (req, res) => {
        try {
            const tagId = req.params.id; // Extract tag from request parameters
            const drops = await Drop.find({ 'tags._id': tagId }).populate('user', 'name'); // Find drops by tag
            res.json({ msg: 'Drops found for the tag', data: drops });
        } catch (error) {
            res.status(500).json({ msg: 'Error fetching drops for the tag', error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const drops = await Drop.find().populate('user', 'name'); // Populate the 'user' field with the 'name' property
            res.json({ msg: 'OK', data: drops });
        } catch (error) {
            res.status(500).json({ msg: 'Error fetching drops', error: error.message });
        }
    },


    getById: async (req, res) => {
        try {
            const dropId = req.params.id;
            const drop = await Drop.findById(dropId).populate('user', 'name'); // Populate the 'user' field with the 'name' property
            if (drop) {
                console.log(drop);
                res.json({ msg: 'Drop found', data: drop });
            } else {
                res.status(404).json({ msg: 'Drop not found' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error fetching drop', error: error.message });
        }
    },

    deleteById: async (req, res) => {
        try {
            const deletedDrop = await Drop.findOneAndDelete({ _id: req.params.id });
            if (deletedDrop) {
                res.json({ msg: 'Drop deleted', data: deletedDrop });
            } else {
                res.status(404).json({ msg: 'Drop not found' });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error deleting drop', error: error.message });
        }
    },

};

module.exports = dropController;
