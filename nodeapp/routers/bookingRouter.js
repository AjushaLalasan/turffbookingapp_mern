// Booking router for Node.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// POST /api/bookings/addBooking
router.post("/addBooking", bookingController.addBooking);

// GET /api/bookings/allBookings
router.get("/allBookings", bookingController.getAllBookings);

// GET /api/bookings/bySport
router.get("/bySport", bookingController.getBySport);

// GET /api/bookings/sortedByDate
router.get("/sortedByDate", bookingController.getSortedByDate);

// DELETE /api/bookings/:id
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
