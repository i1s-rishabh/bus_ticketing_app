const Agency = require("../models/Agency");
const { validationResult } = require("express-validator");



const getAgency = async (req, res) => {
  try {
    const agency = await Agency.findOne({ agent: req.user.id }).populate(
      "agent",
      ["name", "email"]
    );
    if (!agency) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(200).json(agency);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};




const createAgency = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phone, agencyName, headOfficeLocation } = req.body;

  /// profile object

  const agencyFields = { phone, agencyName, headOfficeLocation };
  agencyFields.agent = req.user.id;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if (agencyProfile) {
      // Update needed
      agencyProfile = await Agency.findOneAndUpdate(
        { agent: req.user.id },
        { $set: agencyFields },
        { new: true }
      );
      return res.status(200).json(agencyProfile);
    }

    // Need to create
    
    agencyProfile = new Agency(agencyFields);
    await agencyProfile.save();
    res.status(200).json(agencyProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:"Server Error"});
  }
};


module.exports = { getAgency, createAgency };
