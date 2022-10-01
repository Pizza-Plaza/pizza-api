'use strict';

const pizzaModel = ( sequelize, DataTypes ) => sequelize.define('Pizza', {
  type: { type: DataTypes.ENUM('thin', 'New York', 'Detroit', 'Chicago', 'pan', 'hand tossed'), required: true },
  size: { type: DataTypes.ENUM('sm', 'med', 'lg', 'xl'), required: true },
  sauce: { type: DataTypes.ENUM('traditional', 'bbq', 'ranch', 'garlic parm', 'alfredo', 'pesto'), required: true },
  protien1: { type: DataTypes.ENUM('pepperoni', 'sausage', 'chicken', 'salami', 'anchovies', 'bacon', 'beef', 'ham', 'philly steak'), required: false },
  protien2: { type: DataTypes.ENUM('pepperoni', 'sausage', 'chicken', 'salami', 'anchovies', 'bacon', 'beef', 'ham', 'philly steak'), required: false },
  protien3: { type: DataTypes.ENUM('pepperoni', 'sausage', 'chicken', 'salami', 'anchovies', 'bacon', 'beef', 'ham', 'philly steak'), required: false },
  veggie1: { type: DataTypes.ENUM('black olives', 'green olives', 'onion', 'pineapple', 'green pepper', 'red pepper', 'garlic', 'basil', 'capers', 'tomatoes', 'mushrooms', 'broccoli', 'banana peppers', 'jalapenos', 'habaneros', 'ghost peppers'), required: false},
  veggie2: { type: DataTypes.ENUM('black olives', 'green olives', 'onion', 'pineapple', 'green pepper', 'red pepper', 'garlic', 'basil', 'capers', 'tomatoes', 'mushrooms', 'broccoli', 'banana peppers', 'jalapenos', 'habaneros', 'ghost peppers'), required: false},
  veggie3: { type: DataTypes.ENUM('black olives', 'green olives', 'onion', 'pineapple', 'green pepper', 'red pepper', 'garlic', 'basil', 'capers', 'tomatoes', 'mushrooms', 'broccoli', 'banana peppers', 'jalapenos', 'habaneros', 'ghost peppers'), required: false},
});

module.exports = pizzaModel;