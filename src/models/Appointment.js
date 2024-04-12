const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new Schema({
  accountId: { type: String, required: true },
  facilityID: { type: String, required: true },
  facilityName: { type: String, required: true },
  location: { type: String, required: true },
  locationID: { type: String, required: true },
  service: { type: String, required: true },
  specialist: { type: String, required: true },
  doctorID: { type: String },
  doctorName: { type: String },
  doctorDegree: { type: String },
  doctorGender: { type: String },
  doctorPrice: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", Appointment);
