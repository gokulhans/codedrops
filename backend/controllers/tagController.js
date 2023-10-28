const Tag = require('../models/Tag');

const tagController = {
    createTag: async (req, res) => {
        try {
            const { tagName } = req.body;
            const newTag = new Tag({ tagName });
            await newTag.save();
            res.json({ msg: 'Tag created', data: newTag });
        } catch (error) {
            res.status(500).json({ msg: 'Error creating drop', error: error.message });
        }
    },
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.json({ message: 'OK', data: tags });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tag = await Tag.findByIdAndDelete(tagId);

            if (!tag) {
                return res.status(404).json({ error: 'Tag not found' });
            }
            res.json({ message: 'Tag deleted successfully', tag });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    dropTag: async (req, res) => {
        Tag.collection.drop()
            .then(() => {
                console.log('Tag collection dropped successfully.');
            })
            .catch((err) => {
                console.error('Error dropping Tag collection:', err);
            });
    },
};

module.exports = tagController;
