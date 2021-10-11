
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
        userID: req.body.userID,
        body: req.body.body,
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
            console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

//Update 
StatusRoute.post('/update/:id/:number/true/:userID', (req, res) => {
    let _number = parseInt(req.params.number) + 1;

    Status.findByIdAndUpdate(req.params.id, {"reactNumber" : _number.toString()},{new: true})
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
StatusRoute.post('/update/:id/:number/false/:userID', (req, res) => {
    let _number = parseInt(req.params.number) - 1;

    Status.findByIdAndUpdate(req.params.id, {"reactNumber" : _number.toString()},{new: true})
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

StatusRoute.post('/update/:id/true/:userID', (req, res) => {
    Status.findById(req.params.id)
    .then(data => {
        if ((data.react).indexOf(req.params.userID) == -1)
        {
            Status.findByIdAndUpdate(req.params.id,
                { "$push": { "react": req.params.userID } },
                { "new": true, "upsert": true }
            ).then((data) => {
                // console.log(data.react)      
                res.send(data)}
                )
                .catch(err => console.log(err))
        }
        else          
        res.send(data)}
        )
    .catch(err => console.log(err))
})


StatusRoute.post('/update/:id/false/:userID', (req, res) => {
    Status.findByIdAndUpdate(req.params.id,
        { "$pull": { "react": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)  
        console.log(data.react)      
    })
        .catch(err => console.log(err))
})




module.exports = StatusRoute