'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const pizzaModel = require('./pizza/model');
const Collection = require('./data-collection');
const sidesModel = require('./sides/model');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';
let options = { logging: false };
const sequelize = new Sequelize(DATABASE_URL, options);

const users = userModel(sequelize, DataTypes);
const pizza = pizzaModel(sequelize, DataTypes);
const side = sidesModel(sequelize, DataTypes);

module.exports = {
  database: sequelize,
  pizza: new Collection(pizza),
  side: new Collection(side),
  users,
};
