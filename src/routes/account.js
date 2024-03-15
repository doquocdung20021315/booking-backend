const express = require('express');
const router = express.Router();
const { register, login, getInfoAccount} = require('../controllers/accountController')

router.post('/register', register);

router.post('/login', login);

router.post('/getInfoAccount', getInfoAccount);

module.exports = router;