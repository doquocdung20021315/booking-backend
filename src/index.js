const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const accountRouter = require("./routes/account");
const doctorRouter = require("./routes/doctor");
const specialistRouter = require("./routes/specialist");
const facilityRouter = require("./routes/facility");
const appointmentRouter = require("./routes/appointment");

const app = express();
const hostname = process.env.LOCAL_DEV_APP_HOST;
const port = process.env.LOCAL_DEV_APP_PORT;

connectDB;

// app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/account", accountRouter);
app.use("/doctor", doctorRouter);
app.use("/specialist", specialistRouter);
app.use("/facility", facilityRouter);
app.use("/appointment", appointmentRouter);

app.get("/", (req, res) => {
  res.send("API");
});

if (process.env.BUILD_MODE === "production") {
  app.listen(process.env.PORT, () => {
    console.log(`Appointment Booking App listening at Port: ${process.env.PORT}`);
  });
} else {
  app.listen(port, hostname, () => {
    console.log(`Appointment Booking App listening at ${hostname}:${port}`);
  });
}

module.exports = app;
