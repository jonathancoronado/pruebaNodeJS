// src/models/index.js
const { Sequelize } = require('sequelize');
const debug = require('debug')('sequelize');

require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
  logging: (msg) => debug(msg),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
