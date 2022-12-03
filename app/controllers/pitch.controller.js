/* eslint-disable no-underscore-dangle */
const db = require('../models');

const Pitch = db.pitches;
const Investor = db.investors;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.entrepreneur) {
    res.status(400).send({ message: 'Invalid Request Body' });
    return;
  }

  // Create a pitch
  const pitch = new Pitch({
    entrepreneur: req.body.entrepreneur,
    pitchTitle: req.body.pitchTitle,
    pitchIdea: req.body.pitchIdea,
    askAmount: req.body.askAmount,
    equity: req.body.equity,
    offers: [],
  });

  // Save pitch in the database
  pitch
    .save(pitch)
    .then(() => {
      res.status(201).send({ id: pitch._id.toString() });
    }).catch(() => {
      res.status(404).send({ message: 'Invalid Request Body' });
    });
};

// Update a pitch by the id in the request
exports.makeOffer = (req, res) => {
  const { id } = req.params;

  const offer = new Investor({
    investor: req.body.investor,
    amount: req.body.amount,
    equity: req.body.equity,
    comment: req.body.comment,
  });

  Pitch.findByIdAndUpdate(id, { $push: { offers: offer } }, { useFindAndModify: false })
    .then(() => {
      res.status(201).send({ id: offer._id.toString() });
    }).catch(() => {
      res.status(404).send({
        message: 'Pitch not found',
      });
      res.status(400).send({
        message: 'Invalid Request Body',
      });
    });
};

// Retrieve all pitches from the database.
exports.findAll = (req, res) => {
  Pitch.find().sort('-createdAt')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Invalid Request Body' });
    });
};

// Find a single pitch with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Pitch.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Pitch Not Found',
        });
      } else res.send(data);
    })
    .catch(() => {
      res.status(404).send({
        message: 'Pitch Not Found',
      });
    });
};
