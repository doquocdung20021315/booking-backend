require("dotenv").config();
const mongoose = require("mongoose");

const connect = mongoose
  .connect(`${process.env.MONGODB_URI}${process.env.MONGODB_DATABASE}`)
  .then(() => {
    console.log("Đã kết nối với MongoDB");

    // Gọi phương thức disconnect() khi nhận tín hiệu ngắt (Ctrl+C)
    process.on("SIGINT", async () => {
      try {
        await mongoose.disconnect();
        process.exit(0); // Thoát ứng dụng sau khi đóng kết nối
      } catch (error) {
        console.error("Lỗi khi đóng kết nối:", error);
        process.exit(1); // Thoát ứng dụng với lỗi
      }
    });

    // Gọi phương thức disconnect() khi ứng dụng kết thúc
    process.on("exit", () => {
      mongoose.disconnect();
    });
  }) // console.log("Đã kết nối với MongoDB")
  .catch((error) => console.log("Lỗi kết nối MongoDB:", error));

module.exports = connect;
