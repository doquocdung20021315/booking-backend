const Doctor = require("../models/Doctor");

const getListDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find();
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

module.exports = {
  getListDoctor,
  getListDoctorSpecialist,
};
