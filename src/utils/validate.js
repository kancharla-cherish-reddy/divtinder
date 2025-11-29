// const byrypt = require("bcrypt");
const validator = require("validator");

const validate = (req) => {
  const { emailid, password } = req.body;

  if (!validator.isEmail(emailid)) {
    throw new Error("emial is invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not valid");
  }
};

module.exports = {
  validate,
};
