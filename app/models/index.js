const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.investors = require('./investor.model')(mongoose);
db.pitches = require('./pitch.model')(mongoose);

module.exports = db;
