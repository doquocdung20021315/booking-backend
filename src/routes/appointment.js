const express = require('express');
const router = express.Router();
const { book, getAllAppointmentAccount, deleteAppointmentAccount } = require('../controllers/appointmentController')

router.post('/book', book);

router.post('/getAllAppointmentAccount', getAllAppointmentAccount);

router.delete('/deleteAppointmentAccount', deleteAppointmentAccount);

module.exports = router;