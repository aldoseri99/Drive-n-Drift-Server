const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3001

const db = require("./db")

const auth = require("basic-auth")
const app = express()

app.use(cors())
app.use(express.json({ limit: "60mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(logger("dev"))
app.use(express.static("public"))

// KEEP THE ROUTES DOWN HERE POOKIE BEAR
const bookingRouter = require("./routes/bookingRouter")
const insuranceRouter = require("./routes/insuranceRouter")
const reviewRouter = require("./routes/reviewRouter")
const vehicleRouter = require("./routes/vehicleRouter")
const categoryRouter = require('./routes/categoryRouter')
const AuthRouter = require("./routes/AuthRouter")



app.use("/booking", bookingRouter)
app.use("/insurance", insuranceRouter)
app.use("/review", reviewRouter)
app.use("/vehicle", vehicleRouter)
app.use('/category', categoryRouter)
app.use("/auth", AuthRouter)

app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`)
})
