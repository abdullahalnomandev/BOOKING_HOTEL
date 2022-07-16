import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import HotelRoutes from './routes/hotelsRoutes.js';
import cors from 'cors';
const app = express();
import { AppError } from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

// Routes 
app.use('/api/hotels',HotelRoutes)

// Middleware 
app.use(cors({origin: '*'}));
app.use(express.json());

// Error Handler 
app.all('*',(req,res,next)=>{
  next(AppError(`Can't find ${req.originalUrl} on this server`, 404));
})
app.use(globalErrorHandler)


// Connection 
const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true
    });
  } catch (error) {
    console.log(error);
  }
};


app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected");
});

