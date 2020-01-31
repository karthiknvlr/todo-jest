const mongoose = require('mongoose');
const { setupDB } = require('./setup');

setupDB('todo-list');
const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('Todo List', () => {
	let todoId;

	test(`should response the GET '/'`, async done => {
		try {
			let res = await request.get('/');
			expect(res.statusCode).toBe(200);
			expect(res.body.msg).toBe('API service for TODO - v1.0.0');
			done();
		} catch (error) {
			done(error);
		}
	});
	test('should create a new todo list', async done => {
		try {
			let result = await request.post('/todo').send({
				message: 'I am here for test',
				title: 'Testing title'
			});
			todoId = result.body.id;
			expect(result.statusCode).toBe(201);
			expect(result.body).toBeTruthy();
			done();
		} catch (error) {
			done(error);
		}
	});
	test('should fetch todo list', async done => {
		try {
			let result = await request.get(`/todo/${todoId}`);
			expect(result.statusCode).toBe(200);
			expect(result.body).toBeTruthy();
			done();
		} catch (error) {
			throw new Error(error);
		}
	});
	test('should update todo list', async done => {
		try {
			let result = await request.patch(`/todo/`).send({
				message: 'I am for updating the todo',
				title: 'Update Testing title',
				id: todoId
			});
			expect(result.statusCode).toBe(200);
			expect(result.body).toBeTruthy();
			done();
		} catch (error) {
			throw new Error(error);
		}
	});
	test('should delete todo list', async done => {
		try {
			let result = await request.delete(`/todo/${todoId}`);
			expect(result.statusCode).toBe(202);
			expect(result.body).toBeTruthy();
			done();
		} catch (error) {
			throw new Error(error);
		}
	});
});
