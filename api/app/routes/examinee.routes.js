const router = require('express').Router();

const examinee = require('../controllers/examinee.controller');
const authMiddleware = require('../middleware/auth.middleware');

module.exports = app => {
  router.get('/checked/all', [authMiddleware.isAuthenticated], examinee.getChecked);

  router.post('/checked/all', [authMiddleware.isAuthenticated], examinee.setChecked);

  router.post('/checked', [authMiddleware.isAuthenticated], examinee.addChecked);

  router.put('/:id', [authMiddleware.isAuthenticated], examinee.update);

  router.delete('/:id', [authMiddleware.isAuthenticated], examinee.delete);

  router.get('/unchecked/all', [authMiddleware.isAuthenticated], examinee.getUnchecked);

  router.post('/unchecked/all', [authMiddleware.isAuthenticated], examinee.setUnchecked);

  router.post('/unchecked', [authMiddleware.isAuthenticated], examinee.addUnchecked);

  app.use('/examinee', router);
};
