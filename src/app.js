const express = require("express");

const app = express();

app.use("/user/:username/:dateofbirth", (req, res) => {
  res.send("hello");

  console.log(req.params);
});

app.listen(2000, () => {
  console.log("server running on port 2000");
});
