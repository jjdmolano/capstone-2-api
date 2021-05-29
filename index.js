const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const corsOptions = {
	origin: [
		'http://localhost:3000',
		'https://molano-capstone-2-client.vercel.app',
		'https://capstone-2-client-git-master.jjdmolano.vercel.app',
		'https://capstone-2-client-git-visualupdate2.jjdmolano.vercel.app',
		'https://capstone-2-client.jjdmolano.vercel.app',
		'https://capstone-2-client-git-visualupdate3.jjdmolano.vercel.app'
	],
	optionsSuccessStatus: 200
}

mongoose.connect(process.env.DB_MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

let db = mongoose.connection

db.on('error', () => {
	console.log('Not connected to MongoDB cloud database')
})

db.once('open', () => {
	console.log('Connected to cloud database')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/user')

app.use('/api/users', cors(corsOptions), userRoutes)

app.listen(port, () => {
	console.log(`API is now online on port ${port}`)
})
