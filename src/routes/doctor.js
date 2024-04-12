const express = require("express");
const router = express.Router();
const {
  getListDoctor,
  getListDoctorSpecialist,
  getInfoDoctor,
  getListDoctorByID,
  addDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

router.post("/getListDoctor", getListDoctor);

router.post("/getListDoctorSpecialist", getListDoctorSpecialist);

router.post("/getInfoDoctor", getInfoDoctor);

router.post("/getListDoctorByID", getListDoctorByID);

router.post("/addDoctor", addDoctor);

router.delete("/deleteDoctor", deleteDoctor);

module.exports = router;
