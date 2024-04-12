const express = require("express");
const router = express.Router();
const {
  getAllFacility,
  searchFacility,
  getInfoFacility,
  addFacility,
  deleteFacility,
  modifyFacility,
} = require("../controllers/facilityController");

router.get("/getAllFacility", getAllFacility);

router.post("/searchFacility", searchFacility);

router.post("/getInfoFacility", getInfoFacility);

router.post("/addFacility", addFacility);

router.delete("/deleteFacility", deleteFacility);

router.put("/modifyFacility", modifyFacility);

module.exports = router;
