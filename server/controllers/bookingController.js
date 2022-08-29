import Booking from "../models/bookingModel.js";
import AppError from "../utils/appError.js";

const createBooking = async (req, res, next) => {
  const {
    name,
    date,
    phone,
    address,
    userId,
    city,
    hotel,
    hotelAddress,
    maxPeople,
    price,
    roomName,
    roomNumbers
  } = req.body;
  const singleBooking = {
    name,
    date,
    address,
    phone,
    userId,
    city,
    hotel,
    hotelAddress,
    maxPeople,
    price,
    roomName,
    roomNumbers
  };
  console.log(singleBooking);

  try {
    const newBooking = await Booking.create(singleBooking);
    res.status(201).json({
      status: "success",
      booking: newBooking
    });
  } catch (error) {
    next(new AppError(error));
  }
};

const getBookingByUser = async (req, res, next) => {
    console.log(req.body.userId);
  try {
    const newBooking = await Booking.find({ userId: req.body.userId });
    res.status(201).json({
      status: "success",
      result: newBooking.length,
      booking: newBooking
    });
  } catch (error) {
    next(new AppError(error));
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const getAllBookings = await Booking.find();
    res.status(201).json({
      status: "success",
      result: getAllBookings.length,
      booking: getAllBookings
    });
  } catch (error) {
    next(new AppError(error));
  }
};
export { createBooking, getBookingByUser, getAllBookings };
