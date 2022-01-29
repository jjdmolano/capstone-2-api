const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect(process.env.DB_MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (e) {
		console.log(e);
	}
}

module.exports = { connect };