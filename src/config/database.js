const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    "mongodb+srv://cherishreddy:sF0BsUtvSLVNpfQy@devtinderbe.fhajvbx.mongodb.net/devtinder"
  );

  console.log("connect to mongodb useing mongooese");
};

module.exports = {
  connectDB,
};
