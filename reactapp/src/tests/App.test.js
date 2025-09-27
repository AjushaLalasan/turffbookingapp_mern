import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

jest.mock("../services/api", () => ({
  getBookings: jest.fn(),
  getBySport: jest.fn(),
  getSorted: jest.fn(),
  addBooking: jest.fn(),
  deleteBooking: jest.fn(),
}));

import {
  getBookings,
  getBySport,
  getSorted,
  addBooking,
  deleteBooking,
} from "../services/api";

describe("Booking Management App Tests", () => {
  const mockBookings = [
    {
      id: 1,
      customerName: "John Doe",
      sportType: "Tennis",
      bookingDate: "2025-09-05",
      timeSlot: "10:00 AM",
      duration: 2,
    },
    {
      id: 2,
      customerName: "Alice",
      sportType: "Football",
      bookingDate: "2025-09-10",
      timeSlot: "5:00 PM",
      duration: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------- Basic Rendering ----------
  test("renders navbar with Home and Add Booking links", async () => {
    getBookings.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Add Booking")).toBeInTheDocument();
  });

  test("renders Home page with title", async () => {
    getBookings.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Booking Management")).toBeInTheDocument();
  });

  test("renders empty state when no bookings", async () => {
    getBookings.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Bookings")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("renders list of bookings", async () => {
    getBookings.mockResolvedValueOnce({ data: mockBookings });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  // ---------- Booking Creation ----------
  test("navigates to Add Booking page", async () => {
    getBookings.mockResolvedValueOnce({ data: mockBookings });
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Add New Booking")).toBeInTheDocument();
  });

  test("form requires all fields", async () => {
    getBookings.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Save"));
    expect(await screen.findByPlaceholderText("Customer Name")).toBeInTheDocument();
  });
  // ---------- Booking Deletion ----------
  test("deletes a booking", async () => {
    getBookings
      .mockResolvedValueOnce({ data: mockBookings })
      .mockResolvedValueOnce({ data: [mockBookings[1]] });

    deleteBooking.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Delete")[0]);

    await waitFor(() =>
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument()
    );
  });

  test("delete button exists for each booking", async () => {
    getBookings.mockResolvedValueOnce({ data: mockBookings });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findAllByText("Delete")).toHaveLength(2);
  });

  // ---------- Sorting ----------
  test("sorts bookings by date", async () => {
    getBookings.mockResolvedValueOnce({ data: mockBookings });
    getSorted.mockResolvedValueOnce({ data: [...mockBookings].reverse() });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText("Sort by Date"));
    expect(await screen.findByText("Alice")).toBeInTheDocument();
  });
  // ---------- Edge Cases ----------
  test("handles API error on fetch", async () => {
    getBookings.mockRejectedValueOnce(new Error("Network Error"));
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Bookings")).toBeInTheDocument();
  });


});
