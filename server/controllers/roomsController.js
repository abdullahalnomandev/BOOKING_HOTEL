import Hotel from "../models/hotelesModel.js";
import Room from "../models/roomsModel.js";
import AppError from "../utils/appError.js";

const createRoom = async (req, res, next) => {
  console.log(req.body.hotelId);
  const hotelId = req.body.hotelId;
  try {
    const newRoom = await Room.create(req.body);

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
    } catch (error) {
      next(error);
    }
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

const roomDetails = async (req, res,next) => {
  const id = req.body.id;
  try {
    const roomDetails = await Room.findById(id);
    res.status(200).json({
      status: "success",
      roomDetails: roomDetails
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

// get room by Hotel 
const getRoomsByHotel = async (req, res, next) => {
  const lowPrice = req.body.lowestPrice;
  const heighPrice = req.body.heightPrice;

    const page = req.body.page * 1 || 1;
    const limit = req.body.limit * 1 || 100;
    const skip = (page-1) * limit;
  
  try {
    const hotel = await Hotel.findById(req.body.hotelId);
    const roomId = await Promise.all(
      hotel?.rooms?.map((room) => {
        return room;
      })
    );
     const numRoom = await Room.countDocuments({   _id: roomId,
      price: { $gte: lowPrice, $lte: heighPrice }});
    if (page) {
      if (skip > numRoom) next(new AppError("This page does not exist"));
    }
    const rooms = await Room.find({
      _id: roomId,
      price: { $gte: lowPrice, $lte: heighPrice }
    }).skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      result: numRoom,
      rooms
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};



// UPDATE
const updateRoomAvailability = async (req, res,next) => {
 
  const { dates } = req.body;
  const { roomId } = req.body;
  console.log("id", roomId, "dates", dates);
  
  try {

    await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        $push: { "roomNumbers.$.unavailableDates": dates }
      }
    );
    res.status(200).json({message:'Room updated successfully'});
  } catch (error) {
    next(error);
  }
};
export {
  createRoom,
  getRooms,
  roomDetails,
  getRoomsByHotel,
  updateRoomAvailability
};
