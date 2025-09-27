import axios from "axios";

const API = axios.create({
  baseURL: "https://8080-fddecedccde329052728bccfaccecftwo.premiumproject.examly.io/api/bookings",
});

export const getBookings = () => API.get("/allBookings");
export const getBySport = (sportType) => API.get(`/bySport?sportType=${sportType}`);
export const getSorted = () => API.get("/sortedByDate");
export const addBooking = (booking) => API.post("/addBooking", booking);
export const deleteBooking = (id) => API.delete(`/${id}`);
