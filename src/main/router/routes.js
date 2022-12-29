const { Router } = require('express');
const express = require('express');
const res = require('express/lib/response');
const UserController = require('../infra/controllers/UserController');
const PostsController = require('../infra/controllers/PostsController');

const routes = express.Router();

routes.get('/', (req, res) => {
	res.json({ hello: 'hello World' });
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/users/:user_id/addresses', PostsController.store);

module.exports = routes;
