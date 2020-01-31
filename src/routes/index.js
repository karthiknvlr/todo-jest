const express = require('express');
const router = express.Router();
const Todo = require('../controllers/todo');

router.get('/', (req, res) => {
	res.status(200).json({
		msg: 'API service for TODO - v1.0.0'
	});
});

router
	.route('/todo/:id?')
	.post(Todo.create)
	.get(Todo.fetch)
	.patch(Todo.update)
	.delete(Todo.disable);

module.exports = router;
