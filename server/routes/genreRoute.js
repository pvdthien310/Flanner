const GenreRoute = require("express").Router();
const Gerne = require("../models/Gerne");
const jwt = require("jsonwebtoken");
const { base64encode, base64decode } = require("nodejs-base64");
const url = require("url");

GenreRoute.get("/", async (req, res) => {
  Gerne.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

GenreRoute.get("/:id", async (req, res) => {
  Gerne.findOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

GenreRoute.post("/", async (req, res) => {
  const newGerne = {
    title: req.body.title,
  };
  Gerne.create(newGerne)
    .then((data) => {
      res.send("Successful");
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

GenreRoute.put("/", async (req, res) => {
  Gerne.updateOne(
    { _id: req.body._id },
    {
      title: req.body.title,
    },
    { new: "true" }
  )
    .then((data) => {
      res.json("Update successful");
    })
    .catch((err) => {
      res.status(500).json({ Err: err });
    });
});

GenreRoute.delete("/:id", async (req, res) => {
  Gerne.deleteOne({
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

module.exports = GenreRoute;
