import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("HELLO EXPRESS WE ARE LEARNING NODE>JS");
});
 

// CONNECTION
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
