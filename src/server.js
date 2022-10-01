'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
// const authRoutes = require('./auth/routes.js');
const logger = require('./middleware/logger');

const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// app.use(authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => {
      console.log('IT\'s ALIVE on ${port}');
    });
  },
};