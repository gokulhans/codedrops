const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');


const dropSchema = new Schema({
    dropname: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    dropbody: {
        type: String,
        required: true
    },
    tags: {
        type: [],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    public: {
        type: Boolean,
        default: true // Set the default value to true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Drop', dropSchema);