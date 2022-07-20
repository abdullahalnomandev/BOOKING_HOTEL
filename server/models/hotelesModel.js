import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hotel must have a Name"],
    maxlength: [100, "A hotel email must less  or equal than 100 characters"],
    minlength: [1, "A hotel email must more  or equal than 10 characters"]
  },
  type: {
    type: String,
    required: [true, "A hotel must have a type"],
    enum: {
      values: ["hotel", "restaurant"],
      message: "Difficulty is either: hotel, restaurant"
    }
  },
  district: {
    type: String,
    required: [true, "A hotel must have a district"]
  },
  city: {
    type: String,
    required: [true, "A hotel must have a city"]
  },
  address: {
    type: String,
    required: [true, "A hotel must have a address"]
  },
  photos: {
    type: [String]
  },
  title: {
    type: String,
    required: [true, "A hotel must have a title"]
  },
  desc: {
    type: String,
    required: [true, "A hotel must have a description"]
  },
  rating: {
    type: Number,
    min: [0, "Rating must be above1.0"],
    max: [5, "Rating must be below 5.0"]
  },
  cheapestPrice: {
    type: Number,
    require: [true, "A hotel must have a price"]
  },

  rooms: {
    type: [String]
  }
});

export default mongoose.model("Hotels", hotelSchema);
