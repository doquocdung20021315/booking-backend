require('dotenv').config();
const mongoose = require("mongoose");

const connect = mongoose
  .connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`)
  .then(() => {}) // console.log("Đã kết nối với MongoDB")
  .catch((error) => console.log("Lỗi kết nối MongoDB:", error));

module.exports = connect;
