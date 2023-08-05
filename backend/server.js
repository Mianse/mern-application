const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDb = require('./config/db.js')
const {errorHandler} = require('./middleware/errorMiddleware.js')
const port = process.env.PORT || 5000

connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalroutes.js'))
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on ${port}`))