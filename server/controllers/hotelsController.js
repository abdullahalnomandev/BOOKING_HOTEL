import Hotel from "../models/hotelesModel.js";
import AppError from "../utils/appError.js";

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    await newHotel.save();
    res.status(200).send(newHotel);
  } catch (errors) {
    next(new AppError(errors, 404));
  }
};

const getHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find({ city: req.body.city });

    res.status(200).json({
      status: "success",
      results: allHotels.length,
      hotels: { allHotels }
    });
  } catch (errors) {
    next(new AppError(errors || "Not Found", 404));
  }
};

const getAllCityHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find({});

    res.status(200).json({
      status: "success",
      results: allHotels.length,
      hotels: { allHotels }
    });
  } catch (errors) {
    next(new AppError(errors || "Not Found", 404));
  }
};

const getSingleHotel = async (req, res, next) => {
  try {
    const singleHotel = await Hotel.findById(req.body.hotelId);
    res.status(200).json({
      status: "success",
      hotel: singleHotel
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

const updateHotel = async (req, res, next) => {
  const hotelId = req.body.hotelId;

  try {
    await Hotel.findByIdAndUpdate(
      hotelId,
      { rooms: req.body.rooms },
      { upsert: true }
    );
    res.status(200).json({ message: "success" });
  } catch (errors) {
    next(new AppError(errors));
  }

};

const deleteHotel = async (req, res, next) => {

  try {
    await Hotel.findByIdAndDelete(req.body.hotelId);
    res.status(200).send({
      message: "Hotel deleted successfully"
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

export {
  createHotel,
  getHotels,
  updateHotel,
  getSingleHotel,
  getAllCityHotels,
  deleteHotel
};
