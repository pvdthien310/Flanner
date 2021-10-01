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
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
        profilePic: req.body.profilePic
    })
        .then((data) => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })


})

UserRoute.post('/send-data', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
        profilePic: req.body.profilePic
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