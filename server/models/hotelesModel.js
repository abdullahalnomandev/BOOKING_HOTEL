import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  photos: {
    type: [String]
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  cheapestPrice: {
    type: Number,
    require: true
  },

  rooms: {
    type: [String],
  }
});

export default mongoose.model("Hotels", hotelSchema);
