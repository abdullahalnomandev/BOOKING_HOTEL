import Hotel from "../models/hotelesModel.js";
import Room from "../models/roomsModel.js";
import AppError from "../utils/appError.js";

const createRoom = async (req, res, next) => {
  console.log(req.body);
  const id = req.body.hotelId;
  try {
    const newRoom = await Room.create(req.body);

    try {
      await Hotel.findByIdAndUpdate();
    } catch (errors) {
      next(new AppError(errors));
    }

    //    try {
    //      await Hotel.findByIdAndUpdate(hotelId, {
    //        $push: { rooms: savedRoom._id }
    //      });
    //    } catch (error) {
    //      next(error);
    //    }
    res.status(200).json(newRoom);
  } catch (errors) {
    next(new AppError(errors));
  }
};

const getRooms = async (req, res) => {
  const lowPrice = req.body.lowestPrice;
  const heighPrice = req.body.heightPrice;
  try {
    const getRooms = await Room.find({
      price: { $gte: lowPrice, $lte: heighPrice }
    });
    // const getRooms= await Room.find()
    res.status(200).json({
      status: "success",
      result: getRooms.length,
      rooms: getRooms
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

const roomDetails = async (req, res) => {
  const id = req.body.id;
  try {
    const roomDetails = await Room.find({ _id: id });
    res.status(200).json({
      status: "success",
      roomDetails: roomDetails
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

const getRoomsByHotel = async (req, res,next) => {
  
  console.log(req.body);
  try {
    const hotel =await Hotel.findById(req.body.hotelId);
    const rooms = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.find(room);
      })
    );

    res.status(200).json({
      status: "success",
      result: rooms.length,
      rooms
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

export { createRoom, getRooms, roomDetails, getRoomsByHotel };
