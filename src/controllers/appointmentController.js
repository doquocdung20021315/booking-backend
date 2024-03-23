const Appointment = require("../models/Appointment");
const jwt = require("jsonwebtoken");

const book = async (req, res) => {
  try {
    const { accountId, facility, date, time, specialist, doctor } = req.body;
    const newAppointment = new Appointment({
      accountId,
      facility,
      date,
      time,
      specialist,
      doctor,
      status: "1",
    });
    await newAppointment.save();
    res.status(201).json({ message: "Đặt lịch thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getAllAppointmentAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const tokenVerify = jwt.verify(token, "secret_key");
    const appointments = await Appointment.find({
      accountId: tokenVerify.accountId,
    }).select("-__v");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const deleteAppointmentAccount = async (req, res) => {
  try {
    const { token, appointmentId } = req.body;
    const tokenVerify = jwt.verify(token, "secret_key");
    await Appointment.deleteOne({
      accountId: tokenVerify.accountId,
      _id: appointmentId,
    });
    res.status(200).json("Hủy lịch thành công");
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

module.exports = {
  book,
  getAllAppointmentAccount,
  deleteAppointmentAccount,
};
