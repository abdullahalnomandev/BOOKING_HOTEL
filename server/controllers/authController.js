import User from "../models/usersModel.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
//Sign up user
const signUp = async (req, res, next) => {

  const { name, email, password, passwordConfirm } = req.body;
  const hash = await bcrypt.hash(password, 8);

  try {
    if (password !== passwordConfirm) {
      return next(new AppError("Passwords don't match", 400));
    }
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
      passwordConfirm: hash
    });
    res.status(201).json({
      status: "success",
      message:`Hi, ${newUser.name}! your account created successfully. Please log in.`,
    });
  } catch (error) {
    next(new AppError(error, 400));
  }
};


//Sign in user
const logIn = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return next(new AppError("User not found", 404));

    const isPasswordCorrect = await bcrypt.compare( req.body.password,  user.password );
    if (!isPasswordCorrect) return next(new AppError("Invalid password", 404));
    
    const token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const {password,passwordConfirm,...otherDetails}=user._doc;

    res.cookie("access_token",token,{
      httpOnly: true,
    }).status(200).json({
      status: "success",
      token,
      data: {
        user: otherDetails
      }
    });
  } catch (errors) {
    next(new AppError(errors));
  }
};

export { signUp, logIn };
