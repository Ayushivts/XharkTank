const express = require('express');
const pitches = require('../controllers/pitch.controller');

module.exports = (app) => {
  const router = express.Router();

  // Create a new Pitch
  router.post('/', pitches.create);

  // Retrieve all Pitches
  router.get('/', pitches.findAll);

  // Retrieve a single Pitch with id
  router.get('/:id', pitches.findOne);

  // Make an offer to a Pitch with the id
  router.post('/:id/makeOffer', pitches.makeOffer);

  app.use('/pitches', router);
};
