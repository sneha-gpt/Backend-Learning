const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()

const connectDB = require('./config/db')

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.use('/', require('./routes/authRoutes'))

app.listen(process.env.PORT, () => {
  console.log("Server Running")
})