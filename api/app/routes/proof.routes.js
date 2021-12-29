const router = require('express').Router();

const appointment = require('../controllers/bubble.controller');

module.exports = app => {
  // Create a new Appointment
  router.post('/', appointment.create);

  router.get('', appointment.getRange);

  // Retrieve all appointment
  router.get('/', appointment.findAll);

  // Retrieve a single Appointment with id
  router.get('/:id', appointment.findOne);

  // Update a Appointment with id
  router.put('/:id', appointment.update);

  // Delete a Appointment with id
  router.delete('/:id', appointment.delete);

  // Delete all appointment
  router.delete('/', appointment.deleteAll);

  app.use('/appointment', router);
};
