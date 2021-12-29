const db = require('../models');

const { handleValidationError } = require('../helpers/response');

const { Examinee } = db;

exports.setChecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  res.status(200).send({});
  return '';
};

exports.getChecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Validate request
  if (!req.body.bubbleId) {
    res.status(400).send({
      message: 'Name can not be empty!'
    });
    return '';
  }
  Examinee.findAll({
    where: {
      bubbleId: req.body.bubbleId,
      status: 'geprüft'
    }
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
  return '';
};

exports.addChecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({
      message: 'firstname can not be empty!'
    });
    return '';
  }
  // Validate request
  if (!req.body.bubbleId) {
    res.status(400).send({
      message: 'BubbleID can not be empty!'
    });
    return '';
  }
  // Validate request
  if (!req.body.lastname) {
    res.status(400).send({
      message: 'lastname can not be empty!'
    });
    return '';
  }
  // Validate request
  if (!req.body.category) {
    res.status(400).send({
      message: 'category can not be empty!'
    });
    return '';
  }

  const examinee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    category: req.body.category,
    status: 'geprüft',
    bubbleId: req.body.bubbleId
  };

  Examinee.create(examinee)
    .then(_myExaminee => {
      res.status(200).send({ message: 'Success' });
    })
    .catch(e => {
      res.status(400).send({ message: e });
    });
  return '';
};

exports.deleteChecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  return '';
};

exports.getUnchecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  Examinee.findAll({
    where: {
      bubbleId: req.body.bubbleId,
      status: 'ungeprüft'
    }
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
  return '';
};

exports.setUnchecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  res.status(200).send({});
  return '';
};

exports.addUnchecked = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  const examinee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    category: req.body.category,
    status: 'ungeprüft',
    bubbleId: req.body.bubbleId
  };

  Examinee.create(examinee)
    .then(myExaminee => {
      res.status(200).send({
        id: myExaminee.id,
        message: 'Success'
      });
    })
    .catch(e => {
      res.status(400).send({ message: e });
    });
  return '';
};

exports.update = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  Examinee.findByPk(req.params.id)
    .then(myExaminee => {
      myExaminee.update(req.body);
      res.status(200).send();
    })
    .catch(e => {
      res.status(400).send(e);
    });
  return '';
};

exports.delete = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: 'BubbleID can not be empty!'
    });
    return '';
  }
  Examinee.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(_data => {
      res.status(200).send();
    })
    .catch(e => {
      res.status(400).send(e);
    });
  return '';
};
