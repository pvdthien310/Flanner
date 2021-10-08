
const KnowledgeRoute = require('express').Router();
const Knowledge = require("../models/Knowledge")


/// Delete member
KnowledgeRoute.post('/delete', (req, res) => {
    Knowledge.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
KnowledgeRoute.post('/send-data', (req,res) => {
    const newKnowledge = new Knowledge({
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        avatar: req.body.avatar,
        posttime: req.body.posttime,
        listImage: req.body.listImage,
        react: req.body.react,
        reactNumber: req.body.reactNumber 
    })

    newKnowledge.save()
    .then((data) => {
        console.log(data)
        res.send("Add Success")
    })
    .catch(err => {
        console.log('Error')
    })
})

/// Update member by ID
KnowledgeRoute.post('/update', (req, res) => {
    Knowledge.findByIdAndUpdate(req.body.id, {
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
KnowledgeRoute.get('/:id', (req,res) => {
    Knowledge.findById(req.params.id)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

/// Get all members
KnowledgeRoute.get('/', (req, res) => {
    Knowledge.find({})
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})


module.exports = KnowledgeRoute