const express = require("express");
const byrypt = require("bcrypt");
const { verifyuser } = require("./middelwear/verify");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const { validate } = require("./utils/validate");
// const { use } = require("react");

const app = express();

// app.use("/user", verifyuser);
app.use(express.json());

// app.use("/user", (req, res, next) => {
//   const token = 123;
//   const verifytoken = token === 123;
//   if (verifytoken) {
//     next();
//     // res.status(401).send("bad request");
//   } else {
//     console.log("error");
//     return res.status(401).send("something went wronng");
//   }
// });

// app.post("/signup", async (req, res, next) => {
//   const user = new User(req.body);
//   console.log(user);

//   try {
//     await user.save();
//     // next();
//     // throw new Error("hello");
//     res.send(user);
//   } catch {
//     res.status(401).send("in valid login details");
//   }
// });

app.post("/signup", async (req, res) => {
  // const user = new User(req.body);

  try {
    // validate(req);
    const { password, firstname, lastname, emailID } = req.body;
    const passwordhash = await byrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      password: passwordhash,
      emailID,
    });
    await user.save(); // <<< THIS LINE WAS MISSING
    res.send("user signed in");
    console.log(user);
  } catch (err) {
    // res.status(401).send("error signing in user");
    res.send(err);
  }
});

app.get("/getuserbyname", async (req, res) => {
  const firstName = req.body.firstname;
  try {
    const user = await User.find({ firstname: firstName });
    res.send(user);
  } catch {
    res.status(401).send("in valid input");
  }
});

app.patch("/updateuserbyid", async (req, res) => {
  const userid = req.body._id;
  const data = req.body;
  // console.log(userid);

  try {
    const user = await User.findByIdAndUpdate(userid, data, {
      runValidators: true,
      returnDocument: "after",
    });
    res.send(user);
    console.log("user updates sucsessfully");
  } catch {
    res.status(401).send("error updateing user");
  }
});

app.delete("/deleteuserbyid", async (req, res) => {
  const userid = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userid);
    res.send("user deleted successfully");
  } catch {
    res.status(401).send("error deleted user");
  }
});

app.post("/login", async (req, res) => {
  try {
    // const user = req.body;
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID });

    if (!user) {
      res.send("emial is not valid");
    }

    const verifypassword = await byrypt.compare(password, user.password);
    if (!verifypassword) {
      // throw new Error("password is not valid");
      res.send("not valid password");
    } else {
      res.send("user verified");
    }
  } catch (err) {
    res.status(401).send("login failed");
  }
});
// app.get("/user/getalldata", (req, res) => {
//   res.send("sent all the data");
// });

// app.get("/user/deleteuser", (req, res) => {
//   res.send("deleted all the data");
// });

// app.get(
//   "/home",
//   (req, res, next) => {
//     console.log("first handler");
//     next();
//   },
//   (req, res, next) => {
//     console.log("second handler");
//     next();
//   },
//   (req, res, next) => {
//     res.send("final router handler");
//     // next();
//   }
// );

// app.get("/login", (req, res, next) => {
//   try {
//     throw new Error("hello from error");
//     console.log("hello");
//     res.send("hello from try");
//   } catch (err) {
//     console.log("something is wrong");
//     res.status(401).send("hello from catch");
//   }
// });

app.listen(2000, () => {
  connectDB();

  console.log("server running on port 2000");
});
