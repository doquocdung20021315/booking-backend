const Account = require("../models/Account");
const Facility = require("../models/Facility");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, fullname, birthday, gender, phone, email } = req.body;
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(200).json({ message: "Người dùng đã tồn tại" });
    }
    const newAccount = new Account({
      username,
      password,
      fullname,
      birthday,
      gender,
      phone,
      roleId: "1",
      email,
    });
    await newAccount.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username });
    if (!account) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không chính xác" });
    }
    if (password !== account.password) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không chính xác" });
    }
    const token = jwt.sign({ accountId: account._id }, "secret_key");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getInfoAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const tokenVerify = jwt.verify(token, "secret_key");
    const account = await Account.findOne({
      _id: tokenVerify.accountId,
    }).select("-__v");
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getInfoAcc = async (req, res) => {
  try {
    const { accountId } = req.body;
    const account = await Account.findOne({
      _id: accountId,
    }).select("-__v -password");
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const updateInfoAccount = async (req, res) => {
  try {
    const { token, password, fullname, birthday, gender, phone, email } = req.body;
    const tokenVerify = jwt.verify(token, "secret_key");
    const account = await Account.findOneAndUpdate(
      {
        _id: tokenVerify.accountId,
      },
      { password, fullname, birthday, gender, phone, email },
      {
        new: true,
      }
    ).select("-__v");
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const getAllAccountByNotRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    const accounts = await Account.find({
      roleId: { $ne: roleId },
    }).select("-__v -password");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const searchAccount = async (req, res) => {
  try {
    const { accountId, roleId } = req.body;
    const accounts = await Account.find({
      roleId: { $regex: roleId ? roleId : "", $ne: "3" },
    }).select("-__v -password");
    const list = [];
    accounts.map((account) => {
      if (
        account._id.toString().includes(accountId ? accountId : "")
      ) {
        list.push(account);
      }
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const createAccount = async (req, res) => {
  try {
    const { username, fullname, facilityID } = req.body;
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(200).json({ message: "Người dùng đã tồn tại" });
    }
    const existingFacility = await Facility.findOne({ facilityID });
    if (!existingFacility) {
      return res.status(200).json({ message: "Cơ sở không tồn tại" });
    }
    const newAccount = new Account({
      username,
      password: "abc123",
      fullname,
      birthday: "01-01-1990",
      gender: "Nam",
      phone: "0999999999",
      roleId: "2",
      facilityID,
      email: "999@gmail.com",
    });
    await newAccount.save();
    res.status(201).json({ message: "Tạo tài khoản thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.body;
    await Account.deleteOne({
      _id: accountId,
    });
    res.status(200).json({ message: "Xóa tài khoản thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

module.exports = {
  register,
  login,
  getInfoAccount,
  getInfoAcc,
  updateInfoAccount,
  getAllAccountByNotRole,
  searchAccount,
  createAccount,
  deleteAccount,
};
