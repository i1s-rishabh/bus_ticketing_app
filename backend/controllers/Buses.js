const Bus = require("../models/Buses");
const { validationResult } = require("express-validator");
const Agency = require("../models/Agency");
const { locationSearch } = require("../utils/searchLocation");
const { allBookedTickets } = require('../utils/allBookedTickets')
const Staffs = require("../models/Staffs");

// create a new bus or update the bus 
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

  let { driver, helper } = req.body;

  let busDetails = {
    busName,
    vehicleNo,
    policy,
    images,
    arrivalTime,
    departureTime,
  };

  if (seatCategory) busDetails.seatCategory = seatCategory;
  if (busType) busDetails.busType = busType;

  try {
    let agencyProfile = await Agency.findOne({ agent: req.user.id });
    if (agencyProfile) {
      let bus = await Bus.findOne({ vehicleNo });

      busDetails.agency = agencyProfile._id;
      busDetails.seats = generateBus(seats);

      let formLocation = await locationSearch(from);
      if (!formLocation) {
        return res.status(404).json({ msg: "No such location found" });
      }

      let toLocation = await locationSearch(to);
      if (!toLocation) {
        return res.status(404).json({ msg: "No such location found" });
      }

      driver = await searchStaff(driver);
      console.log(driver);
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

const searchStaff = (phone) => {
  return new Promise((resolve, reject) => {
    let staff = Staffs.findOne({ phone });
    if (staff) {
      resolve(staff);
    }
  });
};

// function which will search buses with some specific fields
const searchBuses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { source, destination, date } = req.body;

  try {
    source = await locationSearch(source);
    if (!source) {
      return res.status(400).json({ msg: "Location Not Found" });
    }

    destination = await locationSearch(destination);
    if (!destination) {
      return res.status(400).json({ msg: "Location Not Found" });
    }

    const buses = await Bus.find({
      $and: [{ to: destination }, { from: source }],
    });
    if (!buses) {
      return res.status(400).json({ msg: "No buses found to such locations" });
    }

    return res.status(200).json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};


//get bus by busId
const getBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.busId );

        if (!bus) {
            return res.status(400).json({ msg: "there is no such bus" })
        }
        return res.json(bus);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "there is no such bus" })
        }
        res.status(500).send("server Error")
    }
}




// get bus status
const getBusStatus = async (req, res) => {
  try {
      const bus = await Bus.findById(req.params.busId );

      if (!bus) {
          return res.status(400).json({ msg: "there is no such bus" })
      }
      const seats = bus.seats;
      
      let allBookedSeats = await allBookedTickets(req.params.busId);
      let statusObj = {}

      for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[i].length; j++){
            if (allBookedSeats.includes(seats[i][j])) {
                statusObj[`${seats[i][j]}`] = 'Booked'
            }
            else {
                statusObj[`${seats[i][j]}`] = 'Empty'
            }
        }
    }
    res.status(200).json(statusObj)

  } catch (err) {
      if (err.kind == 'ObjectId') {
          return res.status(400).json({ msg: "there is no such bus" })
      }
      res.status(500).send("server Error")
  }
}
module.exports = { addBus, searchBuses, getBus, getBusStatus };
