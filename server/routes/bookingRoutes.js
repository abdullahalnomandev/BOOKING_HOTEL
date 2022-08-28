import express from "express";
import {
  createBooking,
  getBookingByUser,
  getAllBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/addBooking", createBooking);
router.post("/getBookingByUser", getBookingByUser);
router.post("/allBookings", getAllBookings);

export default router;
