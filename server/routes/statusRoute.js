
const StatusRoute = require('express').Router();
const Status = require("../models/Status")


/// Delete member
StatusRoute.post('/delete', (req, res) => {
    Status.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
StatusRoute.post('/send-data', (req,res) => {
    const newStatus = new Status({
        username: req.body.username,
        body: req.body.body,
        title : req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        reactNumber: req.body.reactNumber 
    })

    newStatus.save()
    .then((data) => {
        console.log(data)
        res.send("Add Success")
    })
    .catch(err => {
        console.log('Error')
    })
})

/// Update member by ID
StatusRoute.post('/update', (req, res) => {
    Status.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        body: req.body.body,
        title : req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        reactNumber: req.body.reactNumber 
    })
        .then((data) => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    
    
})

//Get a member by ID
StatusRoute.get('/:id', (req,res) => {
    Status.findById(req.params.id)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

/// Get all members
StatusRoute.get('/', (req, res) => {
    Status.find({})
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

module.exports = StatusRoute