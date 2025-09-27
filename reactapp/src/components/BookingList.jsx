import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking, getSorted } from "../services/api";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await getBookings();
    setBookings(data);
  };

  const handleDelete = async (id) => {
    await deleteBooking(id);
    fetchBookings();
  };

  const sortByDate = async () => {
    const { data } = await getSorted();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <button onClick={sortByDate}>Sort by Date</button>
      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            <strong>{b.customerName}</strong> - {b.sportType} on {b.bookingDate} at {b.timeSlot} ({b.duration} hrs)
            <button onClick={() => handleDelete(b.id)} style={{ marginLeft: "10px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
