const Booking = require("../models/Booking");
const bookingController = require("../controllers/bookingController");

describe("Booking Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addBooking", () => {
    it("should add a booking and return 200 with the saved booking", async () => {
      const bookingData = {
        customerName: "Alice",
        sportType: "Football",
        bookingDate: new Date(),
        timeSlot: "6 PM - 8 PM",
        duration: 2,
      };
      const req = { body: bookingData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.prototype.save = jest.fn().mockResolvedValue(bookingData);
      await bookingController.addBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(bookingData);
    });
    it("should handle errors and return 400", async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.prototype.save = jest.fn().mockRejectedValue(new Error("Validation error"));
      await bookingController.addBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Validation error" });
    });
  });

  describe("getAllBookings", () => {
    it("should return all bookings with 200", async () => {
      const bookings = [{ customerName: "A" }, { customerName: "B" }];
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.find = jest.fn().mockResolvedValue(bookings);
      await bookingController.getAllBookings(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(bookings);
    });
    it("should handle errors and return 500", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.find = jest.fn().mockRejectedValue(new Error("DB error"));
      await bookingController.getAllBookings(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("getBySport", () => {
    it("should return bookings by sportType with 200", async () => {
      const bookings = [{ sportType: "Football" }];
      const req = { query: { sportType: "Football" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.find = jest.fn().mockResolvedValue(bookings);
      await bookingController.getBySport(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(bookings);
    });
    it("should handle errors and return 500", async () => {
      const req = { query: { sportType: "Football" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.find = jest.fn().mockRejectedValue(new Error("DB error"));
      await bookingController.getBySport(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("getSortedByDate", () => {
    it("should return bookings sorted by date with 200", async () => {
      const bookings = [{ bookingDate: new Date() }];
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.find = jest.fn().mockReturnValue({ sort: jest.fn().mockResolvedValue(bookings) });
      await bookingController.getSortedByDate(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(bookings);
    });
    it("should handle errors and return 500", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.find = jest.fn().mockReturnValue({ sort: jest.fn().mockRejectedValue(new Error("DB error")) });
      await bookingController.getSortedByDate(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("deleteBooking", () => {
    it("should delete a booking and return 200 with success message", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "1" });
      await bookingController.deleteBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Booking deleted" });
    });
    it("should handle errors and return 500", async () => {
      const req = { params: { id: "2" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Booking.findByIdAndDelete = jest.fn().mockRejectedValue(new Error("DB error"));
      await bookingController.deleteBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });
});
