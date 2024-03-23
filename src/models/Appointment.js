const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = new Schema({
  accountId: { type: String, required: true },
  facility: { type: Object, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  specialist: { type: String, required: true },
  doctor: { type: Object },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', Appointment);