const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  birthday: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  roleId: { type: String, required: true },
  facilityID: { type: String },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Account', Account);