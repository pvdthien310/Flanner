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
 function authenToken(req,res,next){
    const authorizationHeader = req.headers['authorization'];

    const token = authorizationHeader.split(' ')[1];
    if (!token) 
    res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,data) => { 
        console.log(err,data);
        if (err) res.sendStatus(403);
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

UserRoute.get('/load-user-by-userID/:userID', (req,res) => {
    User.find({userID : req.params.userID})
    .then(data => {
        // console.log(data)
     res.send(data)})
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

UserRoute.post('/send-data', (req, res) => {
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