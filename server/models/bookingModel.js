import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  date:{
    type: Date,
    required: [true, "Date is required"]
  },
  phone:{
    type:String,
    required: [true, "Phone is required"]
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  userId: {
    type: String,
    required: [true, "User Id is required"]
  },
  city: {
    type: String,
    required: [true, "City is required"]
  },
  hotel: {
    type: String,
    required: [true, "Hotel is required"]
  },
  hotelAddress: {
    type: String,
    required: [true, "Hotel address is required"]
  },
  maxPeople: {
    type: Number,
    required: [true, "Hotel address is required"],
    min: [1, "People  must be above 0 "],
    max: [5, "People  must be below 5 "]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  roomName: {
    type: String,
    required: [true, "RoomName is required"]
  },
  roomNumbers: {
    type: [Number],
    required: [true, "RoomNumber is required"]
  }
});

export default mongoose.model('Booking', bookingSchema);