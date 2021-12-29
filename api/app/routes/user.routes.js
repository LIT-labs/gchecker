const router = require('express').Router();

module.exports = app => {
  app.use('/user', router);
};
