// Booking model for Node.js (Mongoose style)
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  sportType: { type: String, required: true }, // Cricket, Football, Badminton, Tennis
  bookingDate: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g. "6 PM - 8 PM"
  duration: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model("Booking", BookingSchema);
