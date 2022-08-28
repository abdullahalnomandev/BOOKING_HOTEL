import { mongoose } from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  phone: {
    type: Number,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  registration: {
    type: String,
    default: Date.now()
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Please provide your email address"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email address"
    ],
    validate: {
      validator: function (v) {
        return this.model("User")
          .findOne({ email: v })
          .then((user) => !user);
      },
      message: (props) => `${props.value} is already used by another user`
    }
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your confirm password "],
    minlength: [8, "Confirm password must be at least 8 characters"]
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("User", UserSchema);
