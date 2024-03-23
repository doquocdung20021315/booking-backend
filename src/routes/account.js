const express = require('express');
const router = express.Router();
const { register, login, getInfoAccount, updateInfoAccount } = require('../controllers/accountController')

router.post('/register', register);

router.post('/login', login);

router.post('/getInfoAccount', getInfoAccount);

router.put('/updateInfoAccount', updateInfoAccount);

module.exports = router;