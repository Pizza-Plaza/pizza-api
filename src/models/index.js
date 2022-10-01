'use strict';

const { Sequelize, DataTypes } = require('sequelize');
// const userModel = require('./users');
const pizzaModel = require('./pizza/model');
const Collection = require('./data-collection');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
let options = { logging: false };
const sequelize = new Sequelize(DATABASE_URL);

// const user = userModel(sequelize, DataTypes);
const pizza = pizzaModel(sequelize, DataTypes);

module.exports = {
  database: sequelize,
  pizza: new Collection(pizza),
  // user,
};
