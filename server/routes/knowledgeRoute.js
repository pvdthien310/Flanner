
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
        title : req.body.title,
        description: req.body.description,
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
KnowledgeRoute.post('/update/:id/:number/true/:userID', (req, res) => {
    let _number = parseInt(req.params.number) + 1;

    Knowledge.findByIdAndUpdate(req.params.id, {"reactNumber" : _number.toString()},{new: true})
        .then((data) => {
            Knowledge.findByIdAndUpdate(req.params.id,
                { "$push": { "react": req.params.userID } },
                { "new": true, "upsert": true }
        
            ).then((data) => res.send(data))
            .catch(err => console.log(err))
        }).catch(err => {
            console.log(err)
        })

    
    
})
KnowledgeRoute.post('/update/:id/:number/false/:userID', (req, res) => {
    let _number = parseInt(req.params.number) - 1;

    Knowledge.findByIdAndUpdate(req.params.id, {"reactNumber" : _number.toString()},{new: true})
    .then((data) => {
        Knowledge.findByIdAndUpdate(req.params.id,
            { "$pull": { "react": req.params.userID } },
            { "new": true, "upsert": true }
    
        ).then((data) => res.send(data))
        .catch(err => console.log(err))
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