const Account = require("../models/Account");
const Facility = require("../models/Facility");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dqd262002@gmail.com",
    pass: "tkug wqmb djho kpqp",
  },
});

let listNewAcc = [];

const register = async (req, res) => {
  try {
    const { username, password, fullname, birthday, gender, phone, email } =
      req.body;
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(200).json({ message: "Người dùng đã tồn tại" });
    }
    let authenticationId = Math.floor(Math.random() * 10000).toString();
    listNewAcc.push({
      authenticationId,
      username,
      password,
      fullname,
      birthday,
      gender,
      phone,
      email,
    });
    const mailOptions = {
      from: "dqd262002@gmail.com",
      to: email,
      subject: "Xác thực tài khoản",
      text:
        "Vui lòng sử dụng mã xác thực " +
        authenticationId +
        " để tiếp tục đăng ký tài khoản tại ABook",
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Đã gửi mã xác thực", authenticationId });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const authenticate = async (req, res) => {
  try {
    const { authenId } = req.body;
    let registerInfo;
    listNewAcc = listNewAcc.filter((newAcc) => {
      if (newAcc.authenticationId === authenId) {
        registerInfo = {
          username: newAcc.username,
          password: newAcc.password,
          fullname: newAcc.fullname,
          birthday: newAcc.birthday,
          gender: newAcc.gender,
          phone: newAcc.phone,
          email: newAcc.email,
        };
      }
      return newAcc.authenticationId !== authenId;
    });
    if (!registerInfo) {
      return res.status(200).json({ message: "Mã xác thực không đúng" });
    }
    if (
      registerInfo.username &&
      registerInfo.password &&
      registerInfo.fullname &&
      registerInfo.birthday &&
      registerInfo.gender &&
      registerInfo.phone &&
      registerInfo.email
    ) {
      const newAccount = new Account({
        ...registerInfo,
        roleId: "1",
      });
      await newAccount.save();
    }
    res.status(200).json({ message: "Xác thực thành công" });
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
    let loginInfo;
    if (account.facilityID) {
      loginInfo = {
        roleId: account.roleId,
        facilityID: account.facilityID,
      }
    } else {
      loginInfo = {
        roleId: account.roleId,
      }
    }
    res.status(200).json({ token, ...loginInfo });
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
    const { token, password, fullname, birthday, gender, phone, email } =
      req.body;
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

const getAllAccountByFacilityAndRole = async (req, res) => {
  try {
    const { facilityID, roleId } = req.body;
    const accounts = await Account.find({
      facilityID,
      roleId,
    }).select("-__v -password");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const searchAccount = async (req, res) => {
  try {
    const { accountId, facilityID, roleId } = req.body;
    let accounts;
    if (facilityID) {
      accounts = await Account.find({
        facilityID,
        roleId: { $regex: roleId ? roleId : "", $ne: "3" },
      }).select("-__v -password");
    } else {
      accounts = await Account.find({
        roleId: { $regex: roleId ? roleId : "", $ne: "3" },
      }).select("-__v -password");
    }
    const list = [];
    accounts.map((account) => {
      if (account._id.toString().includes(accountId ? accountId : "")) {
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
    const { username, fullname, facilityID, roleId } = req.body;
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
      password: "new123",
      fullname,
      birthday: "01-01-1990",
      gender: "Nam",
      phone: "0999999999",
      roleId,
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
};
