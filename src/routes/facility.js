const express = require("express");
const router = express.Router();
const { getAllFacility, searchFacility } = require("../controllers/facilityController");

router.get("/getAllFacility", getAllFacility);

router.post("/searchFacility", searchFacility);

module.exports = router;
