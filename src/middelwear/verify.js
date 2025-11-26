const verifyuser = (req, res, next) => {
  const token = 123;
  const verifytoken = token === 1235;
  if (verifytoken) {
    next();
    res.send("user is verified");
  } else {
    res.status(401).send("not verified");
  }
};

module.exports = {
  verifyuser,
};
