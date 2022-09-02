import { mongoose } from "mongoose";

const roomSchema = mongoose.Schema({
  
    hotelId:{
          type: String,
    required: [true, "Please enter a Hotel ID"],
    
  },
  title: {
    type: String,
    required: [true, "Please enter a room name"],
  },
  maxPeople:{
    type: Number,
    min:[1,'People at least one'],
    max:[3,'People at must be below 3 ' ],
    required:[true,'A room must be peoples']
  },
  price: {
    type: Number,
    min: [50, "Room price must be above 50 "],
    max: [500, "Room price must be below 500 "],
    required: [true, "A hotel must have a price"]
  },
  photo:{
    type:String,
  },
  photos:[String],
  roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}]
    
});

export default mongoose.model("Room", roomSchema);
