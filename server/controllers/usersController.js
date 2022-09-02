import User from "../models/usersModel.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";

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
  const { userId, address, phone, name, photo } = req.body;

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
  const token = req?.headers?.authorization.split(" ")[1];
  try {
    const profile = await User.findById(userId);
    const { password, passwordConfirm, ...othersUserDetails } = profile._doc;
    res.status(200).json({
      status: "success",
      token,
      profile: othersUserDetails
    });
  } catch (error) {
    next(new AppError(error));
  }
};

const updatePassword = async (req, res, next) => {
  const { userId, oldPassword,password, passwordConfirm } = req.body;
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, 8);
 console.log(hash);
  try {
    const user = await User.findOne({ _id:userId });
    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordCorrect) return next(new AppError("Old password not correct", 404));
    if (password !== passwordConfirm) return next(new AppError("Password don't match", 404));
    await User.updateOne(
      { _id: userId },
      {
        password:hash,
        passwordConfirm:hash
      }
    );
    res.status(200).json({message:"Password updated successfully"})
  } catch (errors) {
    next(new AppError(errors));
  }
};

export { getAllUsers, updateProfile, getUserProfile, updatePassword };
