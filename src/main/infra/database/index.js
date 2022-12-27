const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');
const User = require('../models/User')
const Address = require('../models/Address')

const connection = new Sequelize(dbConfig);


module.exports = connection;
