const express = require("express");
const router = express.Router();
const { getListDoctor, getListDoctorSpecialist } = require("../controllers/doctorController");

router.get("/getListDoctor", getListDoctor);

router.post("/getListDoctorSpecialist", getListDoctorSpecialist)

module.exports = router;
