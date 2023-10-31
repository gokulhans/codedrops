const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    photoURL: {
        type: String,
    },
    googleId: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false  // Default value is set to false, indicating the user is not blocked initially
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);