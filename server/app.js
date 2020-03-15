const express = require('express');
const mongoose = require('mongoose');

const authRoute = require('./routes/authRoute');
const boardRoute = require('./routes/boardRoute');
const trelloRoute = require('./routes/trelloRoute');
const cardRoute = require('./routes/cardRoute');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/board', boardRoute);
app.use('/api/trello', trelloRoute);
app.use('/api/card', cardRoute);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
});

// DB 연결
const URI =
  'mongodb+srv://Jack:Jacky123@react-trello-pdjjd.mongodb.net/React-Trello?retryWrites=true&w=majority';
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
