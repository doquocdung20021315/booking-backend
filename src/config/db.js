const mongoose = require("mongoose");

const connect = mongoose
  .connect("mongodb://localhost:27017/appointment-booking")
  .then(() => console.log("Đã kết nối với MongoDB"))
  .catch((error) => console.log("Lỗi kết nối MongoDB:", error));

module.exports = connect;
