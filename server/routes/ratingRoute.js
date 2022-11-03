const RatingRoute = require("express").Router();
const Rating = require("../models/Rating");
const jwt = require("jsonwebtoken");
const { base64encode, base64decode } = require("nodejs-base64");
const url = require("url");

RatingRoute.get("/", async (req, res) => {
  Rating.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

RatingRoute.get("/:id", async (req, res) => {
  Rating.findOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

RatingRoute.post("/delete-all", async (req, res) => {
  Rating.deleteMany({}).then((data) => res.send("ok"));
});

RatingRoute.post("/", async (req, res) => {
  const initValue = req.body.negative === 0 && req.body.positive === 0;
  const newRating = {
    positive: req.body.positive,
    negative: req.body.negative,
    rate: initValue
      ? 0
      : req.body.positive / (req.body.positive + req.body.negative),
  };
  Rating.create(newRating)
    .then((data) => {
      res.send("Successful");
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

RatingRoute.put("/", async (req, res) => {
  const initValue = req.body.negative === 0 && req.body.positive === 0;

  Rating.updateOne(
    { _id: req.body._id },
    {
      positive: req.body.positive,
      negative: req.body.negative,
      rate: initValue
        ? 0
        : req.body.positive / (req.body.positive + req.body.negative),
    },
    { new: "true" }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

RatingRoute.delete("/", async (req, res) => {
  Rating.deleteOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.json("Delete successful");
    })
    .catch((err) => {
      res.status(500).json("Delete error");
    });
});

function authenToken(req, res, next) {
  const authorizationHeader = req.headers["x-access-token"];
  const token = authorizationHeader;
  if (!token) {
    res.status(401).send("Token het han");
    return;
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log("accept token");
    if (err) {
      res.sendStatus(401);
      return;
    }
    next();
  });
}

module.exports = RatingRoute;
