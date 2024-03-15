const express = require("express");
const router = express.Router();
const { getListSpecialist} = require("../controllers/specialistController");

router.post("/getListSpecialist", getListSpecialist);

module.exports = router;
