'use strict';

require('dotenv');
const app = require('./src/server.js');
const { database } = require('./src/models');

const PORT = process.env.PORT || 3002;

database.sync().then(() => {
  app.start(PORT);
});