'use strict';

const sidesModel = (sequelize, DataTypes) => sequelize.define('Sides', {
  type: { type: DataTypes.ENUM('crazy bread', 'chicken wings', 'bread sticks', 'caesar salad', 'salad', 'pasta'), required: true}, 
  size: { type: DataTypes.ENUM('sm', 'med', 'lg'), required: true },
});

module.exports = sidesModel;