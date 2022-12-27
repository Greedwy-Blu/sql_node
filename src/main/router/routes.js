const { Router } = require('express');
const express = require('express')
const res = require('express/lib/response');
const UserController = require('../infra/controllers/UserController');
const AddressController = require('../infra/controllers/AddressController');



const routes = express.Router();

routes.get('/', (req, res) => {
  res.json(
    {hello:'hello World'}
  )
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.post('/users/:user_id/addresses', AddressController.store)

module.exports = routes;
