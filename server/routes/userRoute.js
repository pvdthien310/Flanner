const UserRoute = require('express').Router();
const User = require("../models/User")
const sendMail = require("../../gmail-api/sendEmail");
const jwt = require('jsonwebtoken')
const {Base64} = require('js-base64');


//Get a member by ID
UserRoute.get('/:id', (req, res) => {
    User.find({userID : req.params.id})
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

UserRoute.post('/update',authenToken, (req, res) => {
    User.findOneAndUpdate({userID : req.body.userID}, {
        userID: req.body.userID,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        doB: req.body.doB,
        address: req.body.address,
        avatar: req.body.avatar,
        email: req.body.email,
        password: req.body.password,
        following: req.body.following,
        followed: req.body.followed,
        job: req.body.job,
        bio: req.body.bio,
        position: req.body.position,
        reportedNum: req.body.reportedNum,
    }, { "new": true, "upsert": true })
        .then((data) => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

UserRoute.post('/update/:userID/:number',authenToken, (req,res) => {
    User.findOneAndUpdate({userID : req.params.userID}, {"reportedNum" : req.params.number},{new: true})
    .then(data => {
        res.send('Process successful!')
    })
    .catch(err => console.log('err'))
})

/// Add to following
UserRoute.post('/add/:userID/following/:friendID',authenToken, (req, res) => {
    User.findOne({ userID: req.params.friendID })
        .then(data => {
            if ((data.following).indexOf(req.params.userID) == -1) {
                // console.log(data)
                User.findOneAndUpdate({ userID: req.params.friendID },
                    { "$push": { "following": req.params.userID } },
                    { "new": true, "upsert": true }
                ).then((data) => {
                    res.send(data)
                })
                    .catch(err => console.log(err))
            }
            else
                res.send(data)
        }
        )
        .catch(err => console.log(err))
})
/// Add to followed
UserRoute.post('/add/:userID/followed/:friendID',authenToken, (req, res) => {
    User.findOne({ userID: req.params.friendID })
        .then(data => {
            if ((data.followed).indexOf(req.params.userID) == -1) {
                 
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
UserRoute.post('/remove/:userID/following/:friendID',authenToken, (req, res) => {

    User.findOneAndUpdate({ userID: req.params.friendID },
        { "$pull": { "following": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
    })
        .catch(err => console.log(err))
})
// Remove user from followed
UserRoute.post('/remove/:userID/followed/:friendID',authenToken, (req, res) => {

    User.findOneAndUpdate({ userID: req.params.friendID },
        { "$pull": { "followed": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
    })
        .catch(err => console.log(err))
})

UserRoute.post('/send-data',authenToken, (req, res) => {
    let UserID = req.body.userID.toString().replaceAll('.','')
    let processedUserID  = UserID.toString().replaceAll('@','')
    const newUser = new User({
        userID: processedUserID,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        doB: req.body.doB,
        avatar: req.body.avatar,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        position: req.body.position,
        reportedNum: "0",
        following: [],
        followed: [],
        bio: "Hi, I'm a new member of Flaner. Hope you will enjoy your visit to my home wall. Let's be friend!",
        job: ""
    })

    newUser.save()
        .then((data) => {
            // console.log(data)
            res.send(data)
        })
        .catch(err => {
            console.log('Error')
        })
})

UserRoute.post('/checkLogin', (req,res) => {
    console.log(req.body)
    User.findOne({email : req.body.email})
    .then(data => {
        
        if (data)
        {
            console.log(Base64.encode(req.body.password))
            if (data.password == Base64.encode(req.body.password))
            {
                User.find({})
                .then(result => {
                    res.send(result)
                    //sendMail({ value })
                }).catch(err => {
                    console.log(err)
                })
            }
            else 
            {
                res.send('Invalid Password!')
            }
        }
        else 
        {
            res.send('Login failed! Account was not registered!')
        }
        
    })
    .catch(err => console.log(err))
    

})

module.exports = UserRoute