const express = require('express')
const authRoute = require('./routes/authRoute')
const boardRoute = require('./routes/boardsRoute')
const trellosRoute = require('./routes/trellosRoute')
const cardsRoute = require('./routes/cardsRoute')

const app = express()
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/boards', boardRoute)
app.use('/api/trellos', trellosRoute)
app.use('/api/cards', cardsRoute)

app.use((err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message
  const data = err.data
  res.status(status).json({ message: message, data: data })
})

app.listen(5000, (err) => {
  if (process.send) process.send('ready')
})
