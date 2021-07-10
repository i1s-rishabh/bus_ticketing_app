const Bus = require("../models/Buses");
const Tickets = require("../models/Tickets");
const { validationResult } = require("express-validator");
const { allBookedTickets } = require("../utils/allBookedTickets");

const bookTickets = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { seats_no, passengers, journeyDate, email, contactNo } = req.body;

  const createTicket = {
    seats_no,
    passengers,
    journeyDate,
    email,
    contactNo,
  };

  try {
    const bus = await Bus.findById(req.params.busId);

    if (!bus) {
      return res.status(400).json({ msg: "there is no such bus found" });
    }
    let seats = bus.seats;

    const allBookedSeats = await allBookedTickets(req.params.busId);
    if (isOutOfRange(seats_no, seats)) {
      return res.status(400).json({ msg: "No such seats are available in the bus" });
    }
    let isBooked;

    isBooked = seats_no.filter((bookedSeat) => {
      return allBookedSeats.includes(bookedSeat);
    });
    if (isBooked.length > 0) {
      return res.status(400).json({ msg: "seats are already booked" });
    }

    createTicket.userId = req.user.id;
    createTicket.busId = bus._id;
    console.log(createTicket);
    const generateTicket = new Tickets(createTicket);

    await generateTicket.save();

    return res.status(200).json(generateTicket);
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
};

const isOutOfRange = (selected_seats, seats) => {
  var flag = true;
  for (let i = 0; i < selected_seats.length; i++) {
    for (let j = 0; j < seats.length; j++) {
      if (seats[j].includes(selected_seats[i])) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }
  }
  return flag;
};

module.exports = { bookTickets };
