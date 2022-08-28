import React, { useContext, useState } from "react";
import { createContext } from "react";

export const BookingContexts = createContext();

export const BookingContext = ({ children }) => {
  const [booking, setBooking] = useState({
    adult: "2adult",
    arrival: "",
    child: "0child",
    city: "",
    departure: "",
    room: "1room"
  });

  return (
    <BookingContexts.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContexts.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContexts);
