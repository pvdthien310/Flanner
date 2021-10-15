
const NotificationRoute = require('express').Router();
const Notification = require("../models/Notification")


/// Delete member
NotificationRoute.post('/delete', (req, res) => {
    Notification.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
NotificationRoute.post('/send-data', (req,res) => {
    const newNotification = new Notification({
        userID: req.body.userID,
        message: req.body.message,
        postID: req.body.postID,
        senderID: req.body.senderID,
        type: req.body.type,
    })

    newNotification.save()
    .then((data) => {
        //console.log(data)
        res.send("Add Success")
    })
    .catch(err => {
        console.log('Error')
    })
})

/// Update member by ID
NotificationRoute.post('/update', (req, res) => {
    Notification.findByIdAndUpdate(req.body.id, {
        userID: req.body.userID,
        message: req.body.message,
        postID: req.body.post,
        senderID: req.body.senderID,
        type: req.body.type,
    })
        .then((data) => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    
    
})

//Get a member by ID
NotificationRoute.get('/:id', (req,res) => {
    Notification.findById(req.params.id)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

/// Get all members
NotificationRoute.get('/', (req, res) => {
    Notification.find({})
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})


module.exports = NotificationRoute