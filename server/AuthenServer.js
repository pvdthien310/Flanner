const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/userRoute");
const JWTRoute = require("./routes/JWTRoute");
const JWTRefTokens = require("../server/models/JWTRefTokens");
const jwt = require("jsonwebtoken");

/// Process file json and env
app.use(bodyParser.json());
dotenv.config();

/// Connect MongoDB
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected !");
});
mongoose.connection.on("error", () => {
  console.log("Connect MongoDB Failed !");
});

let refreshTokens = [];

/// Handle All API
app.use("/api/user", UserRoute);
app.use("/api/JWT", JWTRoute);

app.use("/get-refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.sendStatus(401);
      return;
    }
    console.log("refreshtoken");
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
});
app.use("/get-accessToken", (req, res) => {
  const data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  //// Update refreshTokens into database
  JWTRefTokens.findByIdAndUpdate(
    "61a3b4c93b737600e720e39f",
    { $push: { refreshTokens: refreshToken } },
    { new: true, upsert: true }
  )
    .then((data) => {
      res.json({ accessToken, refreshToken });
    })
    .catch((err) => console.log(err));
  //
});

app.use("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
  ///update Update refreshTokens into database
  JWTRefTokens.findByIdAndUpdate(
    "61a3b4c93b737600e720e39f",
    { $pull: { refreshTokens: refreshToken } },
    { new: true, upsert: true }
  )
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
  //
});

//// Open port
const port = process.env.AUTHEN_PORT || 8800;
app.listen(port, () => {
  JWTRefTokens.find({})
    .then((data) => {
      refreshTokens = data[0].refreshTokens;
    })
    .catch((err) => console.log(err));
  console.log("AuThen backends server is running on port " + port);
});
