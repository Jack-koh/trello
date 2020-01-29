const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.connection;

autoIncrement.initialize(connection);

const Schema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  background: {
    type: Object,
    require: true
  },
  teams: {
    type: Boolean,
    require: true
  },
  creator: {
    type: Number,
    require: true
  },
  userNoArray: {
    type: Array,
    require: true
  }
}, { timestamps: true })

Schema.plugin(autoIncrement.plugin, {
  model: 'users',
  field: 'userNo',
  startAt: 1,
  increment: 1
})

module.exports = mongoose.model('board', Schema)