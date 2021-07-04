const Bus = require("../models/Buses");
const { check, validationResult } = require("express-validator");
const Agency = require("../models/Agency");
const Location = require("../models/Locations");
const Staffs = require("../models/Staffs");

const addBus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    busName,
    vehicleNo,
    seats,
    busType,
    seatCategory,
    policy,
    images,
    from,
    to,
    arrivalTime,
    departureTime,
  } = req.body;

  let {
    driver,
    helper,} =req.body;

  let busDetails = {
    busName,
    vehicleNo,
    busType,
    seatCategory,
    policy,
    images,
    arrivalTime,
    departureTime,
  };

  busDetails.agency = req.user.id;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if (agencyProfile) {
      let bus = await Bus.findOne({ vehicleNo });

      busDetails.seats = generateBus(seats);

      

      let formLocation = await searchLocation(from);
      if(!formLocation){
          return res.status(404).json({msg:"No such location found"})
      }

      let toLocation = await searchLocation(to)
      if(!toLocation){
        return res.status(404).json({msg:"No such location found"})
    }

      driver = await searchStaff(driver);
        console.log(driver)
      if (!driver.isDriver) {
        return res.status(404).json({ msg: "No such driver found" });
      }

      helper = await searchStaff(helper);
      if (helper.isDriver) {
        return res.status(404).json({ msg: "No such helper found" });
      }

      busDetails.driver = driver;
      busDetails.helper = helper;
      busDetails.from = formLocation._id;
      busDetails.to = toLocation._id;

      if (bus) {
        // Update the bus

        bus = await Bus.findOneAndUpdate(
          { vehicleNo },
          { $set: busDetails },
          { new: true }
        );
        return res.status(200).json(bus);
      }

      bus = new Bus(busDetails);
      console.log("done successfully");
      bus.save();
      res.status(200).json(bus);
    } else {
      return res.status(404).json({ msg: "No agency found of current admin" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

// Create a bus of size n
const generateBus = (seats) => {
  let bus_size = [];
  list = ["A", "B", "C", "D"];
  for (let i = 0; i < 4; i++) {
    row = [];
    for (let j = 1; j <= seats; j++) {
      row.push(j + list[i]);
    }
    bus_size.push(row);
  }
  return bus_size;
};

// search location
const searchLocation = (locations) => {
    return new Promise(resolve => {
        const { city, state } = locations;
        const location = Location.findOne({$and: [{ city: city }, { state: state }]});
        resolve(location);
      }
)}


const searchStaff =  (phone) => {
    return new Promise((resolve,reject) => {
        let staff = Staffs.findOne({ phone });
        if (staff) {
            resolve(staff);
        }
      }
)};
module.exports = { addBus };
