const express = require("express");
const router = express.Router();
const {
  book,
  getAllAppointmentAccount,
  getAllAppointmentFacility,
  deleteAppointmentAccount,
  deleteAppointment,
  searchAppointment,
  searchAppointmentByObjectId,
  checkAppointment,
} = require("../controllers/appointmentController");

router.post("/book", book);

router.post("/getAllAppointmentAccount", getAllAppointmentAccount);

router.post("/getAllAppointmentFacility", getAllAppointmentFacility);

router.delete("/deleteAppointmentAccount", deleteAppointmentAccount);

router.delete("/deleteAppointment", deleteAppointment);

router.post("/searchAppointment", searchAppointment);

router.post("/searchAppointmentByObjectId", searchAppointmentByObjectId);

router.put("/checkAppointment", checkAppointment);

module.exports = router;
