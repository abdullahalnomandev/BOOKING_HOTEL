import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hotel must have a Name"],
    maxlength: [100, "A hotel name must less  or equal than 100 characters"],
    minlength: [10, "A hotel name must more  or equal than 10 characters"]
  },
  type: {
    type: String,
    required: [true, "A hotel must have a type"],
    enum: {
      values: ["hotel"],
      message: "Difficulty is either: hotel, restaurant"
    }
  },
  city: {
    type: String,
    required: [true, "A hotel must have a city"]
  },
  address: {
    type: String,
    required: [true, "A hotel must have a address"]
  },

  title: {
    type: String,
    required: [true, "A hotel must have a title"]
  },
  desc: {
    type: String,
    required: [true, "A hotel must have a description"]
  },
  photo: {
    type: String,
    required: [true, "Please upload a hotel image"]
  },
  rooms: {
    type: [String]
  }
});

export default mongoose.model("Hotels", hotelSchema);
