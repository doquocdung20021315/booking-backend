const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const accountRouter = require('./routes/account');
const doctorRouter = require('./routes/doctor');
const specialistRouter = require('./routes/specialist');
const facilityRouter = require('./routes/facility');
const appointmentRouter = require('./routes/appointment');

const app = express();
const port = 6262;

connectDB;

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/account', accountRouter);
app.use('/doctor', doctorRouter);
app.use('/specialist', specialistRouter);
app.use('/facility', facilityRouter);
app.use('/appointment', appointmentRouter);

app.get("/", (req, res) => {
  res.send("API");
});

app.listen(port, () => {
  console.log(`Appointment Booking App listening on port ${port}`);
});
