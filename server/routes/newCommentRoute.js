const NewCommentRoute = require("express").Router();
const NewComment = require("../models/NewComment");
const jwt = require("jsonwebtoken");
const { base64encode, base64decode } = require("nodejs-base64");
const url = require("url");
const { resolveSoa } = require("dns");

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
NewCommentRoute.delete("/delete", (req, res) => {
  console.log(req.body);
  const level = req.body.level;

  const deleteLevel2 = (currentId) => {
    NewComment.findByIdAndRemove(currentId)
      .then(() => {
        res.send("OK");
      })
      .catch((err) => {
        console.log("error", err);
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
    console.log("delete level 0");
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
NewCommentRoute.put("/update", (req, res) => {
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
  if (newComment.level > 0) {
    if (newComment.parentCmtId === "" || newComment.parentCmtId === null) {
      return res.send("Reply comment must have parentId");
    }
  }

  NewComment.findByIdAndUpdate(req.body.id, newComment)
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
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/// Get number of comments by post Id
NewCommentRoute.get("/count/:postId", (req, res) => {
  NewComment.countDocuments({ postId: req.params.postId })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/// Get comments by its direct parent
NewCommentRoute.get("/load-by-parent/:parentCmtId", (req, res) => {
  NewComment.find({
    parentCmtId: req.params.parentCmtId,
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

/// Get comment by postId and level
NewCommentRoute.get("/load-by-post-level/:postId/:level", (req, res) => {
  NewComment.find({
    postId: req.params.postId,
    level: req.params.level,
  })
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
  ///var queryData = url.parse(req.url, true).query;
  ///const { cursor } = queryData;

  let skip = 0;
  // if (req.params.cursor) skip = base64decode(req.params.cursor);
  if (req.params.cursor) skip = req.params.cursor;

  const data = await NewComment.find({
    postId: req.params.postId,
    level: 0,
  })
    .skip(++skip)
    .limit(LIMIT)
    .exec()
    .catch((err) => console.log(err));

  skip = skip + LIMIT;
  const cursorEncode = base64encode(skip);
  res.send({
    data,
    cursor: cursorEncode,
  });
});

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
