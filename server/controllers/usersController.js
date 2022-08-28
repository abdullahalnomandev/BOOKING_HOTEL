import User from "../models/usersModel.js";
import AppError from "../utils/appError.js";

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      status: "success",
      result: allUsers.length,
      users: allUsers
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

const updateProfile = async (req, res, next) => {
  const { userId, address, phone, name,photo } = req.body;

  try {
    await User.updateOne(
      { _id: userId },
      {
        name,
        address,
        phone,
        photo
      }
    );

    res.status(200).json({
      status: "success",
      message: "User Updated successfully"
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

const getUserProfile = async (req, res, next) => {

  const { userId } = req.body;
  // const token = req?.headers?.authorization.split(" ")[1];
  const token ='iwier';
  try {
    const profile = await User.findById(userId);
    const { password, passwordConfirm, ...othersUserDetails } = profile._doc;

    res.status(200).json({
      status: "success",
      token,
      profile:othersUserDetails
    });
  } catch (error) {
    next(new AppError(error));
  }
};

export { getAllUsers, updateProfile, getUserProfile };
