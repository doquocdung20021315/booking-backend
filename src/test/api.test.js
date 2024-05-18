const request = require("supertest");
const assert = require("assert");
const app = require("../index.js");

describe("Facility Test", () => {
  it("Lấy danh sách tất cả các cơ sở dịch vụ", (done) => {
    request(app)
      .get("/facility/getAllFacility")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(4, res.body.length);
        done();
      });
  });

  it("Tìm kiếm cơ sở dịch vụ", (done) => {
    request(app)
      .post("/facility/searchFacility")
      .send({ name: "", locationID: "31" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(1, res.body.length);
        done();
      });
  });

  it("Lấy thông tin cơ sở dịch vụ", (done) => {
    request(app)
      .post("/facility/getInfoFacility")
      .send({ facilityID: "2002" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("2002", res.body.facilityID);
        done();
      });
  });

  let newFac = {
    name: "Trung tâm hành chính",
    location: "ABC, DEF, Thành phố Hà Nội",
    locationID: "01",
    service: "Hành chính",
  };

  it("Thêm cơ sở dịch vụ", (done) => {
    request(app)
      .post("/facility/addFacility")
      .send(newFac)
      .end((err, res) => {
        if (err) return done(err);
        newFac = res.body.newFacility;
        assert.equal("Thêm cơ sở thành công", res.body.message);
        done();
      });
  });

  it("Chỉnh sửa thông tin cơ sở dịch vụ", (done) => {
    request(app)
      .put("/facility/modifyFacility")
      .send({
        facilityID: newFac?.facilityID,
        name: "Trung tâm",
        locationID: newFac.locationID,
        location: newFac.location,
      })
      .end((err, res) => {
        if (err) return done(err);
        newFac = res.body;
        assert.equal("Trung tâm", res.body.name);
        done();
      });
  });

  it("Xóa cơ sở dịch vụ", (done) => {
    request(app)
      .delete("/facility/deleteFacility")
      .send({ facilityID: newFac?.facilityID })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("Xóa cơ sở thành công", res.body.message);
        done();
      });
  });
});

describe("Specialist Test", () => {
  it("Lấy danh sách chuyên khoa/lĩnh vực của một cơ sở dịch vụ", (done) => {
    request(app)
      .post("/specialist/getListSpecialist")
      .send({ facilityID: "2002" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(4, res.body.length);
        done();
      });
  });

  it("Thêm chuyên khoa/lĩnh vực", (done) => {
    request(app)
      .put("/specialist/addSpecialist")
      .send({ facilityID: "2002", specialist: "Công nghiệp" })
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(res.body.includes("Công nghiệp"));
        done();
      });
  });

  it("Xóa chuyên khoa/lĩnh vực", (done) => {
    request(app)
      .put("/specialist/deleteSpecialist")
      .send({ facilityID: "2002", specialist: "Công nghiệp" })
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(!res.body.includes("Công nghiệp"));
        done();
      });
  });
});

describe("Doctor Test", () => {
  it("Lấy danh sách bác sĩ của một cơ sở y tế", (done) => {
    request(app)
      .post("/doctor/getListDoctor")
      .send({ facilityID: "1002" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(8, res.body.length);
        done();
      });
  });

  it("Lấy danh sách bác sĩ theo chuyên khoa của một cơ sở y tế", (done) => {
    request(app)
      .post("/doctor/getListDoctorSpecialist")
      .send({ facilityID: "1002", specialist: "Hô hấp" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(2, res.body.length);
        done();
      });
  });

  it("Lấy thông tin bác sĩ", (done) => {
    request(app)
      .post("/doctor/getInfoDoctor")
      .send({ doctorID: "10020001" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("10020001", res.body.doctorID);
        done();
      });
  });

  let newDoc = {
    name: "Nguyễn A",
    degree: "TS",
    gender: "Nam",
    specialist: "Hô hấp",
    price: "150000",
    facilityID: "1002",
  };

  it("Thêm bác sĩ", (done) => {
    request(app)
      .post("/doctor/addDoctor")
      .send(newDoc)
      .end((err, res) => {
        if (err) return done(err);
        newDoc = res.body.newDoctor;
        assert.equal("Thêm bác sĩ thành công", res.body.message);
        done();
      });
  });

  it("Xóa bác sĩ", (done) => {
    request(app)
      .delete("/doctor/deleteDoctor")
      .send({ doctorID: newDoc?.doctorID })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("Xóa bác sĩ thành công", res.body.message);
        done();
      });
  });
});

describe("Account Test", () => {
  it("Lấy thông tin tài khoản", (done) => {
    request(app)
      .post("/account/getInfoAcc")
      .send({ accountId: "65dea5442365416793f82aef" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("65dea5442365416793f82aef", res.body._id);
        done();
      });
  });

  let newAcc = {
    username: "username1",
    password: "password1",
    fullname: "Nguyễn A",
    birthday: "10-10-1999",
    gender: "Nam",
    phone: "0987612345",
    email: "doquocdung262002@gmail.com",
  };

  it("Đăng ký", (done) => {
    let authenId = "";
    request(app)
      .post("/account/register")
      .send(newAcc)
      .end((err, res) => {
        if (err) return done(err);
        authenId = res.body.authenticationId;
        assert.equal("Đã gửi mã xác thực", res.body.message);
        request(app)
          .post("/account/authenticate")
          .send({ authenId })
          .end((err, res) => {
            if (err) return done(err);
            assert.equal("Xác thực thành công", res.body.message);
            done();
          });
      });
  });

  let newAccToken = "";

  it("Đăng nhập", (done) => {
    request(app)
      .post("/account/login")
      .send({ username: "username1", password: "password1" })
      .end((err, res) => {
        if (err) return done(err);
        newAccToken = res.body.token;
        assert.ok(res.status);
        done();
      });
  });

  it("Cập nhật thông tin cá nhân", (done) => {
    request(app)
      .put("/account/updateInfoAccount")
      .send({ token: newAccToken, fullname: "Nguyễn B" })
      .end((err, res) => {
        if (err) return done(err);
        newAcc = res.body;
        assert.equal("Nguyễn B", res.body.fullname);
        done();
      });
  });

  it("Xóa tài khoản", (done) => {
    request(app)
      .delete("/account/deleteAccount")
      .send({ accountId: newAcc?._id })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("Xóa tài khoản thành công", res.body.message);
        done();
      });
  });
});

describe("Appointment Test", () => {
  it("Lấy danh sách lịch hẹn của một cơ sở dịch vụ", (done) => {
    request(app)
      .post("/appointment/getAllAppointmentFacility")
      .send({ facilityID: "2002", status: "1" })
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(res.status);
        done();
      });
  });

  let newAppoint = {
    accountId: "65dea5442365416793f82aef",
    facilityID: "2002",
    facilityName: "Trung tâm phục vụ hành chính công IJ",
    location: "18 Hoàng Diệu, Minh Khai, Hồng Bàng, Thành phố Hải Phòng",
    locationID: "31",
    service: "Hành chính",
    specialist: "Nông nghiệp",
    doctorID: "",
    doctorName: "",
    doctorDegree: "",
    doctorGender: "",
    doctorPrice: "",
    date: "2024-04-23",
    time: "08:00 - 09:00",
  };

  it("Đặt lịch hẹn", (done) => {
    request(app)
      .post("/appointment/book")
      .send(newAppoint)
      .end((err, res) => {
        if (err) return done(err);
        newAppoint = res.body.newAppointment;
        assert.equal("Đặt lịch thành công", res.body.message);
        done();
      });
  });

  it("Kiểm tra lịch hẹn", (done) => {
    request(app)
      .put("/appointment/checkAppointment")
      .send({ appointmentId: newAppoint?._id, status: "2" })
      .end((err, res) => {
        if (err) return done(err);
        assert.equal("Đã kiểm tra lịch hẹn", res.body.message);
        done();
      });
  });
});
