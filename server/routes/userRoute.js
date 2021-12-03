const UserRoute = require('express').Router();
const User = require("../models/User")
const sendMail = require("../../gmail-api/sendEmail");
const jwt = require('jsonwebtoken')


//Get a member by ID
UserRoute.get('/:id', (req, res) => {
    User.findById(req.body.userID)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})
const value = {
    from: 'flanerapplication <trithuc23232@gmail.com>',
    to: '19522321@gm.uit.edu.vn',
    subject: "hello",
    html: 'shin ne html'
}

function authenToken(req, res, next) {
    
    const authorizationHeader = req.headers['x-access-token'];
    const token = authorizationHeader;
    if (!token) {
        res.status(401).send('Token het han');
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(401);
            return;
        }
        console.log('accept token')
        next();
    })

}

/// Get all members
UserRoute.get('/', (req, res) => {
    User.find({})
        .then(data => {
            res.send(data)
            //sendMail({ value })
        }).catch(err => {
            console.log(err)
        })
})

UserRoute.get('/load-user-by-userID/:userID',authenToken, (req,res) => {
    User.find({userID : req.params.userID})
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

UserRoute.post('/update', (req, res) => {
    User.findByIdAndUpdate(req.body.id, {
        userID: req.body.userID,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        doB: req.body.doB,
        avatar: req.body.avatar,
        email: req.body.email,
        friendArray: req.body.friendArray,
        password: req.body.password,
        score: req.body.score,
        address: req.body.address,
        position: req.body.position,
        reportedNum: req.body.reportedNum,
    })
        .then((data) => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
})

/// Add to following
UserRoute.post('/add/:userID/following/:friendID', (req, res) => {
    User.find({ userID: req.params.friendID })
        .then(data => {
            if ((data[0].following).indexOf(req.params.userID) == -1) {
                // console.log(data)
                User.findOneAndUpdate({ userID: req.params.friendID },
                    { "$push": { "following": req.params.userID } },
                    { "new": true, "upsert": true }
                ).then((data) => {
                    res.send(data)
                }
                )
                    .catch(err => console.log(err))
            }
            else
                res.send(data)
        }
        )
        .catch(err => console.log(err))
})
/// Add to followed
UserRoute.post('/add/:userID/followed/:friendID', (req, res) => {
    User.find({ userID: req.params.friendID })
        .then(data => {
            if ((data[0].followed).indexOf(req.params.userID) == -1) {
                 
                User.findOneAndUpdate({ userID: req.params.friendID },
                    { "$push": { "followed": req.params.userID } },
                    { "new": true, "upsert": true }
                ).then((data) => {
                    res.send(data)
                }
                )
                    .catch(err => console.log(err))
            }
            else
                res.send(data)
        }
        )
        .catch(err => console.log(err))
})
// Remove user from following
UserRoute.post('/remove/:userID/following/:friendID', (req, res) => {

    User.findOneAndUpdate({ userID: req.params.friendID },
        { "$pull": { "following": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
    })
        .catch(err => console.log(err))
})
// Remove user from followed
UserRoute.post('/remove/:userID/followed/:friendID', (req, res) => {

    User.findOneAndUpdate({ userID: req.params.friendID },
        { "$pull": { "followed": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
    })
        .catch(err => console.log(err))
})

UserRoute.post('/send-data', (req, res) => {
    console.log(req.body)
    const newUser = new User({
        userID: req.body.userID,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        doB: req.body.doB,
        avatar: req.body.avatar,
        email: req.body.email,
        friendArray: req.body.friendArray,
        password: req.body.password,
        score: req.body.score,
        address: req.body.address,
        position: req.body.position,
        reportedNum: req.body.reportedNum,
        following: [],
        followed: [],
        bio: "Hi, I'm a new member of Flaner. Hope you will enjoy your visit to my home wall. Let's be friend!",
        job: ""
    })

    newUser.save()
        .then((data) => {
            console.log(data)
            res.send("Add Success")
        })
        .catch(err => {
            console.log('Error')
        })
})

module.exports = UserRoute