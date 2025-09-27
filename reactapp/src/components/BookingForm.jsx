import React, { useState } from "react";

const BookingForm = ({ onSubmit }) => {
  const [booking, setBooking] = useState({
    customerName: "",
    sportType: "",
    bookingDate: "",
    timeSlot: "",
    duration: "",
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(booking);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="customerName" placeholder="Customer Name" value={booking.customerName} onChange={handleChange} required />
      <input name="sportType" placeholder="Sport Type" value={booking.sportType} onChange={handleChange} required />
      <input type="date" name="bookingDate" value={booking.bookingDate} onChange={handleChange} required />
      <input name="timeSlot" placeholder="Time Slot" value={booking.timeSlot} onChange={handleChange} required />
      <input type="number" name="duration" placeholder="Duration (hrs)" value={booking.duration} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookingForm;
