const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        tagName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps to the schema
);

module.exports = mongoose.model('Tag', tagSchema);
