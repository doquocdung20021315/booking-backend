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
      name: { $regex: name, $options: 'i' },
      locationID: { $regex: locationID },
    });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFacility,
  searchFacility,
};
