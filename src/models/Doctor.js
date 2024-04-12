const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Doctor = new Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  gender: { type: String, required: true },
  specialist: { type: String, required: true },
  price: { type: String, required: true },
  facilityID: { type: String, required: true },
  doctorID: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", Doctor);
