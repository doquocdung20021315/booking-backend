const Specialist = require("../models/Specialist");

const getListSpecialist = async (req, res) => {
  try {
    const { facilityID } = req.body;
    const { specialists } = await Specialist.findOne({ facilityID });
    res.json(specialists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSpecialist = async (req, res) => {
  try {
    const { facilityID, specialist } = req.body;
    const { specialists } = await Specialist.findOne({ facilityID });
    const s = await Specialist.findOneAndUpdate(
      {
        facilityID,
      },
      { specialists: [...specialists, specialist] },
      {
        new: true,
      }
    ).select("-__v");
    res.json(s.specialists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSpecialist = async (req, res) => {
  try {
    const { facilityID, specialist } = req.body;
    const { specialists } = await Specialist.findOne({ facilityID });
    const specs = [];
    specialists.map((spec) => {
      if (spec !== specialist) {
        specs.push(spec);
      }
    });
    const s = await Specialist.findOneAndUpdate(
      {
        facilityID,
      },
      { specialists: [...specs] },
      {
        new: true,
      }
    ).select("-__v");
    res.json(s.specialists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getListSpecialist,
  addSpecialist,
  deleteSpecialist,
};
