import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import globalErrorHandler from "./controllers/errorController.js";
import AuthRoutes from "./routes/authRoutes.js";
import BookingRoutes from "./routes/bookingRoutes.js";
import HotelRoutes from "./routes/hotelsRoutes.js";
import RoomRoutes from "./routes/roomsRoutes.js";
import UserRoutes from "./routes/usersRoutes.js";
import AppError from "./utils/appError.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/hotels", HotelRoutes);
app.use("/api/room", RoomRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/booking", BookingRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working correctly",
  });
});

// Error Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
// console.log(satisfiess)
// Connection
const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};

app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected");
});
