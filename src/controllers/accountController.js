const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, fullname, birthday, gender, phone } = req.body;
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

const updateInfoAccount = async (req, res) => {
  try {
    const { token, password, fullname, birthday, gender, phone } =
      req.body;
    const tokenVerify = jwt.verify(token, "secret_key");
    const account = await Account.findOneAndUpdate(
      {
        _id: tokenVerify.accountId,
      },
      { password, fullname, birthday, gender, phone },
      {
        new: true,
      }
    ).select("-__v");
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

module.exports = {
  register,
  login,
  getInfoAccount,
  updateInfoAccount,
};
