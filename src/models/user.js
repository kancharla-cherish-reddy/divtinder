const { default: mongoose } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("email invalid");
        }
      },
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userschema);

module.exports = {
  User,
};
