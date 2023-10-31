const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false  // Default value is set to false, indicating the user is not blocked initially
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
