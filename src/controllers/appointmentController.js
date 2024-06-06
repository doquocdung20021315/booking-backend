const Appointment = require("../models/Appointment");
const jwt = require("jsonwebtoken");

const book = async (req, res) => {
  try {
    const {
      accountId,
      facilityID,
      facilityName,
      location,
      locationID,
      service,
      specialist,
      doctorID,
      doctorName,
      doctorDegree,
      doctorGender,
      doctorPrice,
      date,
      time,
    } = req.body;
    const appointments = await Appointment.find({
      date,
    });
    let appointId = "";
    if (appointments.length !== 0) {
      let a = parseInt(appointments[appointments.length - 1].appointmentId) + 1;
      appointId = a.toString();
    } else {
      appointId =
        date.slice(2, 4) + date.slice(5, 7) + date.slice(8, 10) + "1000";
    }
    const newAppointment = new Appointment({
      accountId,
      facilityID,
      facilityName,
      location,
      locationID,
      service,
      specialist,
      doctorID,
      doctorName,
      doctorDegree,
      doctorGender,
      doctorPrice,
      date,
      time,
      status: "1",
      appointmentId: appointId,
    });
    await newAppointment.save();
    res.status(201).json({ message: "Đặt lịch thành công", newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getAllAppointmentAccount = async (req, res) => {
  try {
    const { token, status } = req.body;
    const tokenVerify = jwt.verify(token, "secret_key");
    const appointments = await Appointment.find({
      accountId: tokenVerify.accountId,
      status: !status || status === "1" ? "1" : { $in: ["2", "3"] },
    })
      .select("-__v")
      .sort({ date: 1, time: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getAllAppointmentFacility = async (req, res) => {
  try {
    const { facilityID, status } = req.body;
    const appointments = await Appointment.find({
      facilityID: { $regex: facilityID ? facilityID : "" },
      status: { $regex: status ? status : "1" },
    })
      .select("-__v")
      .sort({ date: 1, time: 1 });
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

const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await Appointment.deleteOne({
      _id: appointmentId,
    });
    res.status(200).json("Hủy lịch thành công");
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const searchAppointment = async (req, res) => {
  try {
    const {
      accountId,
      facilityID,
      specialist,
      doctorID,
      date,
      time,
      status,
      appointmentId,
    } = req.body;
    const appointments = await Appointment.find({
      accountId: { $regex: accountId ? accountId : "" },
      facilityID: { $regex: facilityID ? facilityID : "" },
      specialist: { $regex: specialist ? specialist : "" },
      doctorID: { $regex: doctorID ? doctorID : "" },
      date: { $regex: date ? date : "" },
      time: { $regex: time ? time : "" },
      status: { $regex: status ? status : "1" },
      appointmentId: { $regex: appointmentId ? appointmentId : "" },
    }).sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchAppointmentByObjectId = async (req, res) => {
  try {
    const {
      accountId,
      facilityID,
      specialist,
      doctorID,
      date,
      time,
      status,
      appointmentId,
    } = req.body;
    const appointments = await Appointment.find({
      accountId: { $regex: accountId ? accountId : "" },
      facilityID: { $regex: facilityID ? facilityID : "" },
      specialist: { $regex: specialist ? specialist : "" },
      doctorID: { $regex: doctorID ? doctorID : "" },
      date: { $regex: date ? date : "" },
      time: { $regex: time ? time : "" },
      status: { $regex: status ? status : "1" },
    }).sort({ date: 1, time: 1 });
    const list = [];
    appointments.map((appointment) => {
      if (
        appointment._id.toString().includes(appointmentId ? appointmentId : "")
      ) {
        list.push(appointment);
      }
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkAppointment = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    await Appointment.updateOne(
      {
        _id: appointmentId,
      },
      { status }
    );
    res.status(200).json({ message: "Đã kiểm tra lịch hẹn" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

module.exports = {
  book,
  getAllAppointmentAccount,
  getAllAppointmentFacility,
  deleteAppointmentAccount,
  deleteAppointment,
  searchAppointment,
  searchAppointmentByObjectId,
  checkAppointment,
};
