const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb+srv://Jack:Jacky123@cluster0-f2lcg.mongodb.net/React-Trello?retryWrites=true&w=majority');
autoIncrement.initialize(connection);

const Schema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true })

Schema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: 'userNo',
    startAt: 1,
    increment: 1
});

module.exports = mongoose.model('users', Schema)