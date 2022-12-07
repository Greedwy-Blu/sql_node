const express = require('express');
const res = require('express/lib/response');

const routes = express.Router();

routes.get('/', (req, res) => {

  return res.json()

})

module.exports = routes;
