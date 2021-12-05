
const CommentRoute = require('express').Router();
const Comment = require("../models/Comment")
const jwt = require('jsonwebtoken')



/// Delete member
CommentRoute.post('/delete',authenToken, (req, res) => {
    Comment.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
CommentRoute.post('/send-data',authenToken, (req, res) => {
    const newComment = new Comment({
        username: req.body.username,
        postID: req.body.postID,
        userID: req.body.userID,
        body: req.body.body,
        posttime: req.body.posttime,
        react: req.body.react,
    })
    // console.log(newComment)
    newComment.save()
        .then((data) => {
            // console.log(data)
            res.send(data)
        })
        .catch(err => {
            console.log('Error')
        })
})

/// Update member by ID
CommentRoute.post('/update',authenToken, (req, res) => {
    Comment.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        reactNumber: req.body.reactNumber
    })
        .then((data) => {
           res.send('update thanh cong')
        }).catch(err => {
            console.log(err)
        })


})

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['x-access-token'];
    const token = authorizationHeader;
    if (!token) {
        res.sendStatus(401).send('Token het han');
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log('accept token')
        if (err) {
            res.sendStatus(401);
            return;
        }
        next();
    })
}

//Get a member by ID
CommentRoute.get('/:id',authenToken, (req, res) => {
    Comment.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})


CommentRoute.get('/load-data/:postID', (req, res) => {
    Comment.find({ postID: req.params.postID })
        .then(data => res.send(data))
        .catch(err => console.log(err))
})


/// Get all members
CommentRoute.get('/',authenToken, (req, res) => {
    Comment.find({})
        .then(data => {
            // console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})



CommentRoute.post('/update/:id/true/:userID', authenToken, (req, res) => {
    Comment.findById(req.params.id)
        .then(data => {
            if ((data.react).indexOf(req.params.userID) == -1) {
                Comment.findByIdAndUpdate(req.params.id,
                    { "$push": { "react": req.params.userID } },
                    { "new": true, "upsert": true }
                ).then((data) => {
                    res.send(data)
                })
                    .catch(err => console.log(err))
            }
            else
                res.send(data)
        })
        .catch(err => console.log(err))
})


CommentRoute.post('/update/:id/false/:userID', authenToken, (req, res) => {
    Comment.findByIdAndUpdate(req.params.id,
        { "$pull": { "react": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
    })
        .catch(err => console.log(err))
})




module.exports = CommentRoute