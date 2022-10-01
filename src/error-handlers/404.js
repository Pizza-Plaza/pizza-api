'use strict';

module.exports = function (req, res, next) {

  const errorObj = {
    status: 404,
    message: 'Route not found',
  };
  res.status(404).json(errorObj);
};