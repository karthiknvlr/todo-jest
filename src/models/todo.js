const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema(
	{
		title: String,
		message: String,
		status: Boolean
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Todo', todoSchema);
