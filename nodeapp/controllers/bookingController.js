// Booking controller for Node.js
const Booking = require("../models/Booking");

exports.addBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySport = async (req, res) => {
  try {
    const { sportType } = req.query;
    const bookings = await Booking.find({ sportType });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSortedByDate = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: 1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
