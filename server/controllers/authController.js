
import User from "../models/usersModel.js";
import AppError from "../utils/appError.js";

//Sign up user
const signUp = async(req, res, next)=>{
    

    try {
    // if (req.body.password !== req.body.passwordConfirm) return next(AppError("Passwords don't match",400));

        const newUser = await User.create(req.body)
        res.status(200).json({
            status:'success',
            data:{
                user: newUser
            }
        })
    } catch (error) {
        // if (error.name === "ValidationError"){
        //     let errors ={}
        //     Object.keys(error.errors).map((key) => {
          
        //       errors[key] = error.errors[key].message;
        //     });

        //     return res.status(400).send(errors);
        // }
          // next(AppError(error, 400));
          next(new AppError(error, 400));
    }

}

//Sign in user
const logIn = async (req, res, next) => {
  try {
    const newUser = await User.create();
  } catch (errors) {}
};



export { signUp, logIn };