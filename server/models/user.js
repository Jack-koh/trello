const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('user', Schema)