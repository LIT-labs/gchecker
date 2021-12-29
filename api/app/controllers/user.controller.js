const moment = require('moment');
const db = require('../models');
const { logger } = require('../helpers/logger');

const moduleLogger = logger.child({ module: 'user' });

const { handleValidationError, handleNotFound } = require('../helpers/response');

const { User } = db;
const { Bubble } = db;

// Create and Save a new User

exports.createAndLogin = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  moduleLogger.debug('create user', req.body.name, req.body.bubbleId);

  // Validate request
  if (!req.body.name) {
    handleNotFound(res, 'Name can not be empty!');
  }
  if (!req.body.email) {
    handleNotFound(res, 'E-Mail can not be empty!');
  }
  if (!req.body.bubbleId) {
    handleNotFound(res, 'BubbleID can not be empty!');
  }

  Bubble.findByPk(req.body.bubbleId)
    .then(myBubble => {
      User.create({
        name: req.body.name,
        email: req.body.email
      })
        .then(myUser => {
          myUser.sendVerificationEmail();
          myBubble
            .addUser(myUser)
            .then(_data => {
              res
                .status(200)
                .send(myUser.login(myBubble.dataValues.name, myBubble.dataValues.slug, myBubble.dataValues.id));
            })
            .catch(err => {
              res.status(400).send({ message: 'Some error occurred while creating the User.', error: err });
            });
        })
        .catch(err => {
          res.status(400).send({ message: 'Some error occurred while creating the User.', error: err });
        });
    })
    .catch(err => {
      res.status(400).send({ message: 'Some error occurred while creating the User.', error: err });
    });
  return '';
};

exports.confirmPasswordAndLogin = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: 'Password can not be empty!'
    });
    return '';
  }
  if (!req.body.token) {
    res.status(400).send({
      message: 'Token can not be empty!'
    });
    return '';
  }

  User.findOne({
    where: {
      password_reset_token: req.body.token
    }
  })
    .then(myUser => {
      if (myUser) {
        if (moment(myUser.password_reset_expire_at, 'YYYY-MM-DD HH:mm:ss').valueOf() > moment().valueOf()) {
          myUser.updatePassword(req.body.password);
          Bubble.findByPk(myUser.bubbleId).then(myBubble => {
            const result = myUser.login(myBubble.dataValues.name, myBubble.dataValues.slug, myBubble.dataValues.id);
            result.message = 'Passwort wurde gesetzt.';
            res.status(200).send(result);
          });
        } else {
          myUser.sendVerificationEmail();
          res.status(201).send({
            message: 'Der Link ist nicht mehr gültig. Wir haben dir einen neuen geschickt.'
          });
        }
      } else {
        res.status(201).send({
          message: 'Der Link wurde schon benutzt.'
        });
      }
    })
    .catch(e => {
      res.status(202).send({
        message: 'Wir konnten keinen gültigen Nutzer für diesen Link finden',
        error: e
      });
    });
  return '';
};

exports.login = (req, res) => {
  if (!req.body.user) {
    res.status(400).send({
      message: 'User can not be empty!'
    });
    return '';
  }
  if (!req.body.password) {
    res.status(400).send({
      message: 'Password can not be empty!'
    });
    return '';
  }
  if (!req.body.slug) {
    res.status(400).send({
      message: 'Slug can not be empty!'
    });
    return '';
  }
  if (!req.body.bubbleName) {
    res.status(400).send({
      message: 'BubbleName can not be empty!'
    });
    return '';
  }

  Bubble.findOne({
    where: {
      slug: req.body.slug,
      name: req.body.bubbleName
    }
  })
    .then(myBubble => {
      User.findOne({
        where: {
          bubbleId: myBubble.id,
          name: req.body.user
        }
      })
        .then(myUser => {
          if (myUser) {
            if (myUser.password) {
              if (myUser.validPassword(req.body.password)) {
                const data = myUser.login(myBubble.dataValues.name, myBubble.dataValues.slug, myBubble.dataValues.id);
                res.status(200).send(data);
              } else {
                res.status(400).send({
                  message: 'Nutzer/Passwort falsch.'
                });
              }
            } else {
              res.status(201).send({
                message: 'Bitte Email verifizieren.'
              });
              myUser.sendVerificationEmail();
            }
          } else {
            res.status(400).send({
              message: 'Nutzer/Passwort falsch.'
            });
          }
        })
        .catch(e => {
          moduleLogger.error(e);
          res.status(400).send({
            message: "Couldn't find User/Passwort"
          });
        });
    })
    .catch(e => {
      moduleLogger.error(e);
      res.status(400).send({
        message: "Couldn't find gchecker"
      });
    });
  return '';
};
