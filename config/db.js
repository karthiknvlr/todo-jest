const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
	.connect(process.env.MONGODB_URI, {
		dbName: process.env.DATABASE,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Database connected successfully');
		console.log(`MongoDB URI ${process.env.MONGODB_URI}`);
	})
	.catch(err => {
		console.error(`Database error ${err}`);
	});

mongoose.connection.on('error', err => {
	console.error(`Connection error ${err}`);
	console.error(`Please make sure MONGODB is running.`);
	process.exit();
});
