import Jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const verifyToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("A token is required for authentication!", 401));
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; 
  } catch (err) {
    return next(new AppError("Token is not valid!", 403));
  }
  return next();
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin || req.user.isAdmin) {
      console.log(req.user.isAdmin,'user');
      next();
    } else {
      return next(new AppError("You are not authorize!", 403));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(new AppError("You are not authorize!", 403));
    }
  });
};

export { verifyToken, verifyUser, verifyAdmin };
