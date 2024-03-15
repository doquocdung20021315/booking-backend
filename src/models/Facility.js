const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Facility = new Schema({
  facilityID: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  locationID: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model('Facility', Facility);