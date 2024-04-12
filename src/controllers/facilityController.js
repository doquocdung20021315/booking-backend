const Facility = require("../models/Facility");

const getAllFacility = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchFacility = async (req, res) => {
  try {
    const { name, locationID } = req.body;
    const facilities = await Facility.find({
      name: { $regex: name, $options: "i" },
      locationID: { $regex: locationID },
    });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInfoFacility = async (req, res) => {
  try {
    const { facilityID } = req.body;
    const facility = await Facility.findOne({
      facilityID: facilityID,
    }).select("-__v");
    res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const addFacility = async (req, res) => {
  try {
    const { name, location, locationID, service } = req.body;
    let facility;
    if (service === "Y tế") {
      facility = await Facility.find({
        facilityID: { $regex: /^1/ },
      }).select("-__v");
    } else if (service === "Hành chính") {
      facility = await Facility.find({
        facilityID: { $regex: /^2/ },
      }).select("-__v");
    }
    let facId = parseInt(facility[facility.length - 1].facilityID) + 1;
    const newFacility = new Facility({
      facilityID: facId.toString(),
      name,
      location,
      locationID,
      service,
    });
    await newFacility.save();
    res.status(200).json({ message: "Thêm cơ sở thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const deleteFacility = async (req, res) => {
  try {
    const { facilityID } = req.body;
    await Facility.deleteOne({
      facilityID: facilityID,
    });
    res.status(200).json({ message: "Xóa cơ sở thành công" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const modifyFacility = async (req, res) => {
  try {
    const { facilityID, name, locationID, location } = req.body;
    const facility = await Facility.findOneAndUpdate(
      {
        facilityID,
      },
      { name, locationID, location },
      {
        new: true,
      }
    ).select("-__v");
    res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

module.exports = {
  getAllFacility,
  searchFacility,
  getInfoFacility,
  addFacility,
  deleteFacility,
  modifyFacility,
};
