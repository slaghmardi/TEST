const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
const hotelsRouter = require('./routes/hotels')
const reservationsRouter = require('./routes/reservations')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/reservations', reservationsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${5000}`)
})