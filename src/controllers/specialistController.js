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

module.exports = {
  getListSpecialist,
};
