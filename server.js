const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const db = require('./db')

const auth = require('basic-auth')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(express.static('public'))

// KEEP THE ROUTES DOWN HERE POOKIE BEAR
const bookingRouter=require('./routes/bookingRouter')
const insuranceRouter=require('./routes/insuranceRouter')
const reviewRouter=require('./routes/reviewRouter')
const vehicleRouter=require('./routes/vehicleRouter')
app.use('/booking',bookingRouter)
app.use('/insurance',insuranceRouter)
app.use('/review',reviewRouter)
app.use('/vehicle',vehicleRouter)



app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`)
})