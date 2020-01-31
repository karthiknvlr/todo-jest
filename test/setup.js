/* global beforeAll beforeEach afterEach afterAll */
// const { seedDatabase } = require('./seeds');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

// Delete all collections from a database
async function removeAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany();
	}
}

// Delete all collections from a database
async function dropAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		try {
			await collection.drop();
		} catch (error) {
			if (error.message === 'ns not found') return;
			if (error.message.includes('a background operation is currently running')) return;
			console.log(error.message);
		}
	}
}

module.exports = {
	setupDB(databaseName) {
		// Connect to Mongoose
		beforeAll(async () => {
			const url = `mongodb://127.0.0.1/${databaseName}`;
			await mongoose.connect(url, { useNewUrlParser: true });
		});

		// Disconnect Mongoose
		afterAll(async () => {
			await dropAllCollections();
			await mongoose.connection.close();
		});
	}
};
