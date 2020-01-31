const TodoList = require('../models/todo');
const _ = require('lodash');

/**
 * Create TODO List
 *
 * @param {string} message (message)
 * @param {string} coinId (title)
 */
async function create(req, res) {
	let { message, title } = req.body;
	TodoList.create({
		message: message,
		title: title,
		status: true
	})
		.then(data => {
			res.status(201).json({
				msg: 'TODO created successfully',
				id: data._id
			});
		})
		.catch(err => {
			res.status(400).json({
				err: err
			});
		});
}

/**
 * Fetch TODO List
 *
 * @param {params} id (todo id)
 */
async function fetch(req, res) {
	let { id } = req.params;
	let todo = await TodoList.findOne({ _id: id });
	if (_.isEmpty(todo)) {
		res.status(200).json({
			msg: 'Invalid message id'
		});
	} else {
		res.status(200).json({
			todo
		});
	}
}

/**
 * Update TODO List
 *
 * @param {params} id (todo id)
 * @param {string} message (message)
 * @param {string} coinId (title)
 */
async function update(req, res) {
	let { message, title, id } = req.body;
	TodoList.findOneAndUpdate(
		{
			_id: id
		},
		{
			message: message,
			title: title
		},
		{
			new: true
		}
	)
		.then(todo => {
			res.status(200).json({
				msg: 'Todo updated successfully',
				todo
			});
		})
		.catch(err => {
			res.status(400).json({
				err: err,
				msg: 'Error in updating todo'
			});
		});
}

/**
 * Delete TODO List
 *
 * @param {params} id (todo id)
 */
async function disable(req, res) {
	let { id } = req.params;
	TodoList.findOneAndUpdate(
		{
			_id: id
		},
		{
			status: false
		},
		{
			new: true
		}
	)
		.then(todo => {
			if (_.isEmpty(todo)) {
				res.status(200).json({
					msg: 'Invalid Todo ID'
				});
			} else {
				res.status(202).json({
					msg: 'Todo Deleted successfully'
				});
			}
		})
		.catch(err => {
			res.status(400).json({
				err: err,
				msg: 'Error in deleting Todo'
			});
		});
}
module.exports = {
	create,
	fetch,
	update,
	disable
};
