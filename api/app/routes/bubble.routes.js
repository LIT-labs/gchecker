const router = require('express').Router();

const bubble = require('../controllers/bubble.controller');
const authMiddleware = require('../middleware/auth.middleware');

module.exports = app => {
  router.get('/users', [authMiddleware.isAuthenticated], bubble.getUsers);

  router.get('/categories', [authMiddleware.isAuthenticated], bubble.getCategories);

  router.post('/categories', [authMiddleware.isAuthenticated], bubble.setCategories);

  app.use('/bubble', router);
};
