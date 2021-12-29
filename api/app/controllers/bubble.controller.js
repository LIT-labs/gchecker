const db = require('../models');

const { handleValidationError, handleSuccess } = require('../helpers/response');

const UserController = require('./user.controller');

const { Bubble } = db;
const { User } = db;

const { logger } = require('../helpers/logger');

const moduleLogger = logger.child({ module: 'auth route' });

// Create and Save a new Bubble
exports.createBubbleAndUser = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Validate request
  if (!req.body.bubbleName) {
    res.status(400).send({
      message: 'Name can not be empty!'
    });
    return '';
  }

  const categoryDefault = [
    { header: 'Wähle eine Kategorie oder erstelle eine neue' },
    { text: 'Mitarbeiter', color: 'blue' },
    { text: 'Besucher', color: 'green' }
  ];

  Bubble.create({ name: req.body.bubbleName, categories: JSON.stringify(categoryDefault) })
    .then(myBubble => {
      req.body.bubbleId = myBubble.id;
      UserController.createAndLogin(req, res);
    })
    .catch(err => {
      moduleLogger.error('Some error occurred while creating the bubble', err);
      res.status(500).send({
        message: err || 'Some error occurred while creating the bubble.'
      });
    });
  return '';
};

exports.setCategories = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  Bubble.findByPk(req.body.bubbleId)
    .then(myBubble => {
      const data = JSON.stringify(req.body.data);
      myBubble.updateCategories(data);
      res.status(200).send();
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || 'Some error occurred while finding a bubble.'
      });
    });
  return '';
};
exports.getCategories = (req, res) => {
  moduleLogger.info('IIIINNNNNCOMMMMING');
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  Bubble.findByPk(req.body.bubbleId)
    .then(myBubble => {
      moduleLogger.info('SSUUUUUCCCEEESS', JSON.parse(myBubble.categories));
      const categories = JSON.parse(myBubble.categories);
      handleSuccess(res, 'categories found', categories);
    })
    .catch(e => {
      moduleLogger.info('ERRROR');
      res.status(500).send({
        message: e.message || 'Some error occurred while finding a bubble.'
      });
    });
  return '';
};
exports.getUsers = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  User.findAll({
    where: { bubbleId: req.body.bubbleId },
    attributes: ['id', 'name']
  })
    .then(myUsers => {
      res.status(200).send(myUsers);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || 'Some error occurred while finding a bubble.'
      });
    });
  return '';
};
