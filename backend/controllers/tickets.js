const Bus = require("../models/Buses");
const Tickets = require("../models/Tickets");
const { validationResult } = require("express-validator");
const { allBookedTickets } = require("../utils/allBookedTickets");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sonu19@navgurukul.org",
    pass: '777777777'
  }
});


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
    const generateTicket = new Tickets(createTicket);
    await generateTicket.save();

    var mailOptions = {
      from: 'sonu19@navgurukul.org',
      to: 'deepak19@navgurukul.org',
      subject: "Testing of nodemailer",
      text: "Deepak Deepak"
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(400).json({msg:"error"})
      } else {
        console.log('Email sent successfully: ');
        return res.status(200).json(generateTicket);
      }
    });
    
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

const cancelTickets = async (req, res) => {
  try{
    const ticket =await Tickets.findOne({_id:req.params.ticketId,userId:req.user.id})
    if(!ticket){
    return res.status(400).json({msg:"ticket not found"})
    }
    await Tickets.findOneAndDelete({_id:req.params.ticketId})
    return res.status(200).json({msg:"ticket cancelled successfuly"})
  }catch(err){
    return res.status(500).json({msg:"server error"})
  }
}

module.exports = { bookTickets, cancelTickets };
