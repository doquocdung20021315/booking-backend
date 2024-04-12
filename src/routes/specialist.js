const express = require("express");
const router = express.Router();
const { getListSpecialist, addSpecialist, deleteSpecialist } = require("../controllers/specialistController");

router.post("/getListSpecialist", getListSpecialist);

router.put("/addSpecialist", addSpecialist);

router.put("/deleteSpecialist", deleteSpecialist);

module.exports = router;
