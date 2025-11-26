const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
  const token = 123;
  const verifytoken = token === 123;
  if (verifytoken) {
    next();
  } else {
    console.log("error");
    return res.status(401).send("something went wronng");
  }
});

app.get("/user/getalldata", (req, res) => {
  res.send("sent all the data");
});

app.get(
  "/home",
  (req, res, next) => {
    console.log("first handler");
    next();
  },
  (req, res, next) => {
    console.log("second handler");
    next();
  },
  (req, res, next) => {
    res.send("final router handler");
    // next();
  }
);

app.get("/login", (req, res, next) => {
  try {
    throw new Error("hello from error");
    console.log("hello");
    res.send("hello from try");
  } catch (err) {
    console.log("something is wrong");
    res.status(401).send("hello from catch");
  }
});

app.listen(2000, () => {
  console.log("server running on port 2000");
});
