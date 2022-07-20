import Hotel from "../models/hotelesModel.js";
import AppError from "../utils/appError.js";

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    await newHotel.save();
    res.status(200).send(newHotel);
  } catch (errors) {
    next(new AppError(errors,404));
  }
};

const getHotels = async (req, res, next) => {

  try {
    const queryObject = {...req.query};
    const page =   queryObject.page * 1 || 1;
    const limit =  queryObject.limit * 1 || 100;
    const skip = (page - 1)*limit;

    if(queryObject.page){
      const numHotels = await Hotel.countDocuments();
      if(skip>numHotels) throw new Error('This page does not exist');
    }

    const allHotels = await Hotel.find().skip(skip).limit(limit);
    
    res.status(200).json({
      status: "success",
      results: allHotels.length,
      data: { allHotels }
    });
  } catch (errors) {
    // next(AppError(errors.message||'Not Found',404));
    next(new AppError(errors || "Not Found", 404));
  }
};

const updateHotel = async (req, res, next) => {
  const updateHotelItem = req.body;

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      updateHotelItem,
      { upsert: true }
    );
    res.status(200).send(updateHotel);
  } catch (errors) {
    console.log(errors);
  }
};

export { createHotel, getHotels, updateHotel };
