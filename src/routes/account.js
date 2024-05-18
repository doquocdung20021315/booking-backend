const express = require("express");
const router = express.Router();
const {
  register,
  authenticate,
  login,
  getInfoAccount,
  getInfoAcc,
  updateInfoAccount,
  getAllAccountByNotRole,
  getAllAccountByFacilityAndRole,
  searchAccount,
  createAccount,
  deleteAccount,
} = require("../controllers/accountController");

router.post("/register", register);

router.post("/authenticate", authenticate);

router.post("/login", login);

router.post("/getInfoAccount", getInfoAccount);

router.post("/getInfoAcc", getInfoAcc);

router.put("/updateInfoAccount", updateInfoAccount);

router.post("/getAllAccountByNotRole", getAllAccountByNotRole);

router.post("/getAllAccountByFacilityAndRole", getAllAccountByFacilityAndRole);

router.post("/searchAccount", searchAccount);

router.post("/createAccount", createAccount);

router.delete("/deleteAccount", deleteAccount);

module.exports = router;
