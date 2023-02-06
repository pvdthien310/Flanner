const KnowledgeRoute = require("express").Router();
const Knowledge = require("../models/Knowledge");
const mongoose = require("mongoose");
const Gerne = require("../models/Gerne");
const mergeObjectData = require("../utils/index.js");

const Rating = require("../models/Rating");
const jwt = require("jsonwebtoken");
const { base64encode, base64decode } = require("nodejs-base64");
const url = require("url");
const { ObjectId } = require("mongodb");

KnowledgeRoute.get("/load-data/newsfeeds", async (req, res) => {
  const LIMIT = 10;
  var queryData = url.parse(req.url, true).query;
  const { cursor } = queryData;

  let skip = 0;
  if (cursor) skip = base64decode(cursor);
  let data = await Knowledge.find({ mode: "public" })
    .populate("genres")
    .populate("rating")
    .exec();
  // .sort({ posttime: -1 })
  // .skip(+skip)
  // .limit(LIMIT)

  data = data.reverse().slice(+skip, +skip + LIMIT);
  skip = +skip + LIMIT;
  const cursorEncode = base64encode(skip);

  res.send({
    data,
    cursor: cursorEncode,
  });
});

/// Delete member
KnowledgeRoute.post("/delete", authenToken, (req, res) => {
  Knowledge.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.send("delete lien");
    })
    .catch((err) => {
      console.log("error", err);
    });
});

/// Add new member
KnowledgeRoute.post("/send-data", authenToken, (req, res) => {
  generateRating()
    .then((data) => {
      console.log(data);
      const newKnowledge = new Knowledge({
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        mode: req.body.mode,
        rating: data._id,
        genres: req.body.genres,
      });

      newKnowledge
        .save()
        .then((data) => {
          res.send("Add Success");
        })
        .catch((err) => {
          console.log("Error", err);
        });
    })
    .catch((err) => {
      console.log("rating when gen knowledge", err);
      res.status(400).send(err);
    });
});

/// Update member by ID
KnowledgeRoute.post("/update", (req, res) => {
  Knowledge.findById(req.body.id)
    .then((result) => {
      const _mode = result.mode;
      Knowledge.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        rating: req.body.rating,
        mode: _mode,
        genres: req.body.genres,
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log("err "));
});

KnowledgeRoute.post("/update/:id/true/:userID", authenToken, (req, res) => {
  Knowledge.findById(req.params.id)
    .then((data) => {
      if (data.react.indexOf(req.params.userID) == -1) {
        // console.log(data)
        Knowledge.findByIdAndUpdate(
          req.params.id,
          { $push: { react: req.params.userID } },
          { new: true, upsert: true }
        )
          .then((data) => {
            // console.log(data.react)
            res.send(data);
          })
          .catch((err) => console.log(err));
      } else res.send(data);
    })
    .catch((err) => console.log(err));
});

KnowledgeRoute.post("/update/:id/false/:userID", authenToken, (req, res) => {
  Knowledge.findByIdAndUpdate(
    req.params.id,
    { $pull: { react: req.params.userID } },
    { new: true, upsert: true }
  )
    .then((data) => {
      res.send(data);
      // console.log(data.react)
    })
    .catch((err) => console.log(err));
});
KnowledgeRoute.post("/update/:id", (req, res) => {
  Knowledge.findByIdAndUpdate(req.params.id, req.params, {
    new: true,
    upsert: true,
  })
    .then((data) => {
      res.send(data);
      // console.log(data.react)
    })
    .catch((err) => console.log(err));
});

//Get a member by ID
KnowledgeRoute.get("/:id", (req, res) => {
  Knowledge.findById(req.params.id)
    .populate("genres")
    .populate("rating")
    .then((data) => {
      if (data) {
        res.send(data);
      } else res.send("No Exist");
    })
    .catch((err) => console.log(err));
});

KnowledgeRoute.get("/load-data/:userID", authenToken, (req, res) => {
  Knowledge.find({ userID: req.params.userID })
    .populate("genres")
    .populate("rating")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
/// Load data without private and limitary post
KnowledgeRoute.get("/load-data/friend/:userID", authenToken, (req, res) => {
  Knowledge.find({ userID: req.params.userID })
    .populate("genres")
    .populate("rating")
    .then((data) => {
      let processedList = data.filter((item) => {
        if (item.mode == "public") return item;
      });
      res.send(processedList);
    })
    .catch((err) => console.log(err));
});

/// Get all members
KnowledgeRoute.get("/", authenToken, (req, res) => {
  Knowledge.find({})
    .populate("genres")
    .populate("rating")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
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

KnowledgeRoute.get("/load-data/newsfeed/random", authenToken, (req, res) => {
  Knowledge.aggregate([{ $sample: { size: 15 } }])
    .then(async (data) => {
      let processedList = data.filter((item) => {
        if (item.mode == "public") return item;
      });
      Knowledge.populate(processedList, "rating")
        .then((list) => {
          res.send(list);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

KnowledgeRoute.post(
  "/update/mode/:postID/limitary",
  authenToken,
  (req, res) => {
    Knowledge.findByIdAndUpdate(
      req.params.postID,
      { mode: "limitary" },
      { new: true }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
KnowledgeRoute.post("/update/mode/:postID/private", authenToken, (req, res) => {
  Knowledge.findById(req.params.postID)
    .then((result) => {
      if (result.mode == "limitary") {
        res.send(result);
        return;
      } else {
        Knowledge.findByIdAndUpdate(
          req.params.postID,
          { mode: "private" },
          { new: true }
        )
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => console.log("Loi load user"));
});
KnowledgeRoute.post("/update/mode/:postID/public", authenToken, (req, res) => {
  Knowledge.findById(req.params.postID)
    .then((result) => {
      if (result.mode == "limitary") {
        res.send(result);
        return;
      } else {
        Knowledge.findByIdAndUpdate(
          req.params.postID,
          { mode: "public" },
          { new: true }
        )
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => console.log("Loi load user"));
});
KnowledgeRoute.post("/update-post", authenToken, (req, res) => {
  Knowledge.updateMany(
    { userID: req.body.userID },
    { username: req.body.name, avatar: req.body.avatar }
  )
    .then((result) => {
      res.send("Update Knowledge Successful!");
    })
    .catch((err) => console.log(err));
});

const generateRating = () => {
  const newRating = new Rating({ rate: 0, positive: 0, negative: 0 });

  return newRating.save();
};

KnowledgeRoute.post("/update-rating-object", (req, res) => {
  Knowledge.find({})
    .then((data) => {
      let dataId = data.map((item) => item._id);
      dataId.map((kl) => {
        generateRating().then((rt) => {
          Knowledge.updateOne({ _id: kl }, { rating: rt._id })
            .then((result) => {})
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = KnowledgeRoute;
