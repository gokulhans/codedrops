const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dropSchema = new Schema({
    dropname: {
        type: String,
        required: true
    },
    dropbody: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Drop = mongoose.model('Drop', dropSchema);

module.exports = Drop;
