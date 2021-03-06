const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const API_VERSION = '1';

const repositoriesRouter = require('./api/routes/repositories');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/v${API_VERSION}/repositories`, repositoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const error = createError(err.status || 500);

  res.status(error.status).send({
    message: error.message
  });
});

module.exports = app;
