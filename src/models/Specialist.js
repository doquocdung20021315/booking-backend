const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Specialist = new Schema({
  facilityID: { type: String, required: true },
  specialists: { type: Array, required: true },
});

module.exports = mongoose.model("Specialist", Specialist);
