const express = require('express');
const cors = require('cors');
const routes = require('./routes/user');
const app = express();
const mongodb = require('./mongodb.connect');

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
};

mongodb.connect();
app.use(express.json());
app.use('/api/users', cors(corsOptions), routes);
app.use((error, req, res, next) => {
	res.status(500).json({ message: error.message });
});

module.exports = app;
