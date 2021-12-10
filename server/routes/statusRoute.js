
const StatusRoute = require('express').Router();
const Status = require("../models/Status")
const User = require("../models/User")
const jwt = require('jsonwebtoken')



/// Delete member
StatusRoute.post('/delete', authenToken, (req, res) => {
    Status.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
StatusRoute.post('/send-data', authenToken, (req, res) => {
    console.log(req.body.mode)
    const newStatus = new Status({
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        mode: req.body.mode
    })
    // console.log(newStatus)
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
StatusRoute.post('/update', authenToken, (req, res) => {
    Status.findById(req.body.id)
        .then(result => {
            const _mode = result.mode
            Status.findByIdAndUpdate(req.body.id, {
                username: req.body.username,
                userID: req.body.userID,
                body: req.body.body,
                avatar: req.body.avatar,
                posttime: req.body.posttime,
                listImage: req.body.listImage,
                react: req.body.react,
                mode: _mode
            })
                .then(data => {

                    res.send(data)
                }).catch(err => {
                    console.log(err)
                })
        })
        .catch(err => console.log('err '))



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
StatusRoute.get('/:id', authenToken, (req, res) => {
    Status.findById(req.params.id)
        .then(data => {
            if (data)
                res.send(data)
            else
                res.send('No Exist')
        })
        .catch(err => console.log(err))
})


StatusRoute.get('/load-data/:userID', authenToken, (req, res) => {
    Status.find({ userID: req.params.userID })
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

//Load data without private and limitary post
StatusRoute.get('/load-data/friend/:userID', authenToken, (req, res) => {
    Status.find({ userID: req.params.userID })
        .then(data => {
            let processedList = data.filter(item => {
                if (item.mode == 'public') return item
            })
            res.send(processedList)
        })
        .catch(err => console.log(err))
})

/// Get all members
StatusRoute.get('/', authenToken, (req, res) => {
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
StatusRoute.post('/update/mode/:postID/limitary', authenToken, (req, res) => {
    Status.findByIdAndUpdate(req.params.postID, { "mode": 'limitary' }, { new: true })
        .then((data) => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})
StatusRoute.post('/update/mode/:postID/private', authenToken, (req, res) => {
    Status.findByIdAndUpdate(req.params.postID, { "mode": 'private' }, { new: true })
        .then((data) => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})
StatusRoute.post('/update/mode/:postID/public', authenToken, (req, res) => {
    Status.findByIdAndUpdate(req.params.postID, { "mode": 'public' }, { new: true })
        .then((data) => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

StatusRoute.get('/load-data/newsfeed/random/:userID', authenToken, (req, res) => {
    User.find({})
        .then(data => {
            // res.send(data)
            let processedList = data.filter(item => {
                if (item.following.indexOf(req.params.userID) != -1 && item.followed.indexOf(req.params.userID) != -1)
                    return item;
            })
            console.log(processedList)

            Status.aggregate([{ $sample: { size: 10 } }])
                .then(data => {
                    let ListStatus = []
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < processedList.length; j++) {
                            if (data[i].userID == processedList[j].userID) {
                                if (!ListStatus.includes(data[i]))
                                    ListStatus.push(data[i]);
                                break;
                            }
                        }
                    }
                    res.send(ListStatus)
                }).catch(err => {
                    console.log(err)
                })
        }).catch(err => {
            console.log(err)
        })



})




module.exports = StatusRoute