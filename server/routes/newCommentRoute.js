const NewCommentRoute = require("express").Router();
const NewComment = require("../models/NewComment");
const jwt = require("jsonwebtoken");

const nullText = " null/ blank";

/// Add root comment (for level 0)
NewCommentRoute.post("/add-root", (req, res) => {
  const newComment = new NewComment({
    postId: req.body.postId,
    userId: req.body.userId,
    userName: req.body.userName,
    reactUsers: req.body.reactUsers,
    body: req.body.body,
    isPositive: req.body.isPositive,
    parentCmtId: req.body.parentCmtId,
    level: 0,
  });

  if (newComment.postId === null || newComment.postId === "") {
    return res.send("PostId" + nullText);
  }
  if (newComment.userId === null || newComment.userId === "") {
    return res.send("userId" + nullText);
  }
  if (newComment.body === null || newComment.body === "") {
    return res.send("body" + nullText);
  }

  newComment
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

/// Add reply comment (for level 1, 2)
NewCommentRoute.post("/add-reply", (req, res) => {
  const newComment = new NewComment({
    postId: req.body.postId,
    userId: req.body.userId,
    userName: req.body.userName,
    reactUsers: req.body.reactUsers,
    body: req.body.body,
    isPositive: req.body.isPositive,
    parentCmtId: req.body.parentCmtId,
    level: req.body.level,
  });

  if (newComment.postId === null || newComment.postId === "") {
    return res.send("PostId" + nullText);
  }
  if (newComment.userId === null || newComment.userId === "") {
    return res.send("userId" + nullText);
  }
  if (newComment.body === null || newComment.body === "") {
    return res.send("body" + nullText);
  }
  if (newComment.parentCmtId === null || newComment.params === "") {
    return res.send("parentId" + nullText);
  }
  if (newComment.level == 0) {
    return res.send("reply comment level must be bigger than 0");
  }

  const currentId = newComment._id.toString();
  newComment
    .save()
    .then(() => {
      NewComment.findByIdAndUpdate(newComment.parentCmtId, {
        $push: {
          childCmtId: currentId,
        },
      })
        .then((data1) => {
          res.json(data1);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

/// Delete comment
NewCommentRoute.put("/delete", (req, res) => {
  const level = req.body.level;

  const deleteLevel2 = (currentId) => {
    NewComment.findByIdAndRemove(currentId)
      .then(() => {
        res.send("OK");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteLevel1 = (currentId) => {
    NewComment.findOne({ _id: currentId }).then((commentLvl1) => {
      if (commentLvl1) {
        NewComment.findByIdAndRemove(currentId)
          .then(() => {
            if (commentLvl1.childCmtId.length !== 0) {
              commentLvl1.childCmtId.forEach((item) => {
                deleteLevel2(item);
                res.send("OK");
              });
            } else {
              res.send("OK");
              return;
            }
          })
          .catch((err) => {
            console.log("error", err);
          });
      } else {
        res.send("Id is not existed");
      }
    });
  };

  const deleteLevel0 = (currentId) => {
    NewComment.findOne({ _id: currentId }).then((commentLvl0) => {
      if (commentLvl0) {
        NewComment.findByIdAndRemove(currentId)
          .then(() => {
            if (commentLvl0.childCmtId.length !== 0) {
              console.log(commentLvl0.childCmtId);
              commentLvl0.childCmtId.forEach((item) => {
                deleteLevel1(item);
              });
              res.send("OK");
            } else {
              res.send("OK");
              return;
            }
          })
          .catch((err) => {
            console.log("error", err);
          });
      } else {
      }
    });
  };

  if (req.body.id === "" || req.body.id === null) {
    return res.send("CommentId" + nullText);
  }

  if (req.body.level === "" || req.body.level === null) {
    return res.send("Level" + nullText);
  }

  if (level == 0) {
    deleteLevel0(req.body.id);
  } else if (level == 1) {
    deleteLevel1(req.body.id);
  } else {
    deleteLevel2(req.body.id);
  }
});

/// Delete all
NewCommentRoute.delete("/delete-all", (req, res) => {
  NewComment.deleteMany()
    .then((data) => {
      res.send("OK");
    })
    .catch((err) => console.log(err));
});

/// Update comment by ID
NewCommentRoute.post("/update", (req, res) => {
  const newComment = {
    postId: req.body.postId,
    userId: req.body.userId,
    userName: req.body.userName,
    reactUsers: req.body.reactUsers,
    body: req.body.body,
    isPositive: req.body.isPositive,
    parentCmtId: req.body.parentCmtId,
    level: req.body.level,
  };
  if (newComment.postId === null || newComment.postId === "") {
    return res.send("PostId" + nullText);
  }
  if (newComment.userId === null || newComment.userId === "") {
    return res.send("userId" + nullText);
  }
  if (newComment.body === null || newComment.body === "") {
    return res.send("body" + nullText);
  }
  if (newComment.level > 0) {
    if (newComment.parentCmtId === "" || newComment.parentCmtId === null) {
      return res.send("Reply comment must have parentId");
    }
  }

  NewComment.updateOne({ _id: req.body._id }, newComment)
    .then((data) => {
      res.send("OK");
    })
    .catch((err) => {
      console.log(err);
    });
});

function authenToken(req, res, next) {
  const authorizationHeader = req.headers["x-access-token"];
  const token = authorizationHeader;
  if (!token) {
    res.sendStatus(401).send("Token het han");
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

//Get a comment by ID
NewCommentRoute.get("/:id", (req, res) => {
  NewComment.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/// Get comments by post Id
NewCommentRoute.get("/load-by-post/:postId", (req, res) => {
  NewComment.find({ postId: req.params.postId })
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/// Get number of comments by post Id
NewCommentRoute.get("/count/:postId", (req, res) => {
  NewComment.countDocuments({ postId: req.params.postId })
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/// Get comments by its direct parent
NewCommentRoute.get("/load-by-parent/:parentCmtId", (req, res) => {
  NewComment.find({
    parentCmtId: req.params.parentCmtId,
  })
    .sort({ createdAt: -1 })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

/// Get comment by postId and level
NewCommentRoute.get("/load-by-post-level/:postId/:level", (req, res) => {
  NewComment.find({
    postId: req.params.postId,
    level: req.params.level,
  })
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/// Press react comment
NewCommentRoute.put("/react/:commentId/:userId", (req, res) => {
  NewComment.findById(req.params.commentId)
    .then((data) => {
      if (data.reactUsers.indexOf(req.params.userId) == -1) {
        NewComment.findByIdAndUpdate(
          req.params.commentId,
          { $push: { reactUsers: req.params.userId } },
          { new: true, upsert: true }
        )
          .then((data) => {
            res.send(data);
          })
          .catch((err) => console.log(err));
      } else {
        NewComment.findByIdAndUpdate(
          req.params.commentId,
          { $pull: { reactUsers: req.params.userId } },
          { new: true, upsert: true }
        )
          .then((data) => {
            res.send(data);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

/// Pagination
NewCommentRoute.get("/load/limit-comment/:postId/:cursor", async (req, res) => {
  if (req.params.postId === "" || req.params.postId === null) {
    res.send("Post id " + nullText);
  }

  if (!Number.isInteger(parseInt(req.params.cursor))) {
    res.send("Cursor must be an integer");
  }
  const LIMIT = 5;
  let skip = parseInt(req.params.cursor);
  await NewComment.find({
    postId: req.params.postId,
    level: 0,
  })
    .sort({ createdAt: -1, _id: -1 })
    .skip(skip)
    .limit(LIMIT)
    .then((data) => {
      skip = skip + LIMIT;
      res.send({
        data,
        cursor: skip,
      });
    })
    .catch((err) => console.log(err));
});

//reload Comment
NewCommentRoute.get(
  "/reload/limit-comment/:postId/:numOfItems",
  async (req, res) => {
    if (req.params.postId === "" || req.params.postId === null) {
      res.send("Post id " + nullText);
    }

    const to = parseInt(req.params.numOfItems);
    await NewComment.find({
      postId: req.params.postId,
      level: 0,
    })
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(to)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  }
);

/// Update username
NewCommentRoute.put("/update/username", async (req, res) => {
  NewComment.updateMany(
    { userId: req.body.userId },
    { userName: req.body.username }
  )
    .then((data) => {
      res.send("OK");
    })
    .catch((err) => console.log(err));
});
module.exports = NewCommentRoute;

/// Count positive and negative
NewCommentRoute.get("/sentiment/total-positive", async (req, res) => {
  NewComment.countDocuments({
    level: 0,
    isPositive: "1",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

NewCommentRoute.get("/sentiment/total-negative", async (req, res) => {
  NewComment.count({
    level: 0,
    isPositive: "2",
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

NewCommentRoute.post("/update-sentiment/:commentId/:value", (req, res) => {
  NewComment.updateOne(
    { _id: req.params.commentId },
    { isPositive: req.params.value.toString() }
  )
    .then((data) => {
      res.json("OK");
    })
    .catch((err) => console.log(err));
});
