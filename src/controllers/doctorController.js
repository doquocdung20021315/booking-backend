const Doctor = require("../models/Doctor");

const getListDoctor = async (req, res) => {
  try {
    const { facilityID } = req.body;
    const doctors = await Doctor.find({ facilityID });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListDoctorSpecialist = async (req, res) => {
  try {
    const { facilityID, specialist } = req.body;
    const doctors = await Doctor.find({ facilityID, specialist });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInfoDoctor = async (req, res) => {
  try {
    const { doctorID } = req.body;
    const doctor = await Doctor.findOne({
      doctorID,
    }).select("-__v");
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getListDoctorByID = async (req, res) => {
  try {
    const { facilityID, doctorID } = req.body;
    const doctors = await Doctor.find({
      facilityID,
      doctorID: { $regex: doctorID },
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const { facilityID, name, degree, gender, specialist, price } = req.body;
    const doctors = await Doctor.find({
      facilityID,
    });
    let docId = parseInt(doctors[doctors.length - 1].doctorID) + 1;
    const newDoctor = new Doctor({
      name,
      degree,
      gender,
      specialist,
      price,
      facilityID,
      doctorID: docId.toString(),
    });
    await newDoctor.save();
    res.status(200).json({ message: "Thêm bác sĩ thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { doctorID } = req.body;
    await Doctor.deleteOne({
      doctorID,
    });
    res.status(200).json({ message: "Xóa bác sĩ thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

module.exports = {
  getListDoctor,
  getListDoctorSpecialist,
  getInfoDoctor,
  getListDoctorByID,
  addDoctor,
  deleteDoctor,
};
