const UserRoute = require('express').Router();
const User = require("../models/User")

//Get a member by ID
UserRoute.get('/:id', (req, res) => {
    User.findById(req.body.id)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

/// Get all members
UserRoute.get('/', (req, res) => {
    User.find({})
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
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