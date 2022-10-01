'use strict';

module.exports = function(req, res, next) {
  console.log('REQUEST:', req.method, req.path);

  next();
};