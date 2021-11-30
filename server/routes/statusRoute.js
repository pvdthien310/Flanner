
const StatusRoute = require('express').Router();
const Status = require("../models/Status")
const jwt = require('jsonwebtoken')



/// Delete member
StatusRoute.post('/delete',authenToken, (req, res) => {
    Status.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
StatusRoute.post('/send-data',authenToken, (req, res) => {
    const newStatus = new Status({
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        reactNumber: req.body.reactNumber
    })
    console.log(newStatus)
    newStatus.save()
        .then((data) => {
            // console.log(data)
            res.send("Add Success")
        })
        .catch(err => {
            console.log('Error')
        })
})

/// Update member by ID
StatusRoute.post('/update',authenToken, (req, res) => {
    Status.findByIdAndUpdate(req.body.id, {
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
            // console.log(data)
        }).catch(err => {
            console.log(err)
        })


})

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['x-access-token'];
    const token = authorizationHeader;
    if (!token) {
        res.status(401).send('Token het han');
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
StatusRoute.get('/:id',authenToken, (req, res) => {
    Status.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})


StatusRoute.get('/load-data/:userID', authenToken, (req, res) => {
    Status.find({ userID: req.params.userID })
        .then(data => res.send(data))
        .catch(err => console.log(err))
})


/// Get all members
StatusRoute.get('/',authenToken, (req, res) => {
    Status.find({})
        .then(data => {
            // console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

//Update 
StatusRoute.post('/update/:id/:number/true/:userID', authenToken, (req, res) => {
    let _number = parseInt(req.params.number) + 1;

    Status.findByIdAndUpdate(req.params.id, { "reactNumber": _number.toString() }, { new: true })
        .then((data) => {
            Status.findByIdAndUpdate(req.params.id,
                { "$push": { "react": req.params.userID } },
                { "new": true, "upsert": true }

            ).then((data) => res.send(data))
                .catch(err => console.log(err))
        }).catch(err => {
            console.log(err)
        })
})
StatusRoute.post('/update/:id/:number/false/:userID', authenToken, (req, res) => {
    let _number = parseInt(req.params.number) - 1;

    Status.findByIdAndUpdate(req.params.id, { "reactNumber": _number.toString() }, { new: true })
        .then((data) => {
            Status.findByIdAndUpdate(req.params.id,
                { "$pull": { "react": req.params.userID } },
                { "new": true, "upsert": true }

            ).then((data) => res.send(data))
                .catch(err => console.log(err))
        }).catch(err => {
            console.log(err)
        })
})

StatusRoute.post('/update/:id/true/:userID', authenToken, (req, res) => {
    Status.findById(req.params.id)
        .then(data => {
            if ((data.react).indexOf(req.params.userID) == -1) {
                Status.findByIdAndUpdate(req.params.id,
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


StatusRoute.post('/update/:id/false/:userID', authenToken, (req, res) => {
    Status.findByIdAndUpdate(req.params.id,
        { "$pull": { "react": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
    })
        .catch(err => console.log(err))
})




module.exports = StatusRoute