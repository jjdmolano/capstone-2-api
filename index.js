const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const corsOptions = {
    origin: 'https://capstone-2-client.vercel.app',
    optionsSuccessStatus: 200
}

mongoose.connect(process.env.DB_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection

db.on('error', ()=> {
    console.log('Not connected to MongoDB cloud database')
})

db.once('open', ()=> {
    console.log('Connected to cloud database')
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoutes = require('./routes/user')

app.use('/api/users', cors(corsOptions), userRoutes)

app.listen(process.env.PORT, ()=> {
    console.log(`API is now online on port ${process.env.PORT}`)
})