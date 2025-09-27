import React from "react";
import BookingForm from "../components/BookingForm";
import { addBooking } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
  const navigate = useNavigate();

  const handleAdd = async (booking) => {
    await addBooking(booking);
    navigate("/");
  };

  return (
    <div>
      <h2>Add New Booking</h2>
      <BookingForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddBooking;
