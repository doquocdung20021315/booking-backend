const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getInfoAccount,
  getInfoAcc,
  updateInfoAccount,
  getAllAccountByNotRole,
  searchAccount,
  createAccount,
  deleteAccount,
} = require("../controllers/accountController");

router.post("/register", register);

router.post("/login", login);

router.post("/getInfoAccount", getInfoAccount);

router.post("/getInfoAcc", getInfoAcc);

router.put("/updateInfoAccount", updateInfoAccount);

router.post("/getAllAccountByNotRole", getAllAccountByNotRole);

router.post("/searchAccount", searchAccount);

router.post("/createAccount", createAccount);

router.delete("/deleteAccount", deleteAccount);

module.exports = router;
