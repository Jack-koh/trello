const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const URI =
  'mongodb+srv://Jack:Jacky123@react-trello-pdjjd.mongodb.net/React-Trello?retryWrites=true&w=majority'
const connection = mongoose.createConnection(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
autoIncrement.initialize(connection)

const userSchema = Schema(
  {
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'userNo',
  startAt: 1,
  increment: 1
})

module.exports = mongoose.model('User', userSchema)
