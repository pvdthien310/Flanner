
const KnowledgeRoute = require('express').Router();
const Knowledge = require("../models/Knowledge");
const jwt = require('jsonwebtoken')


/// Delete member
KnowledgeRoute.post('/delete', (req, res) => {
    Knowledge.findByIdAndRemove(req.body.id)
        .then((data) => {
            res.send("delete lien")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
KnowledgeRoute.post('/send-data', (req, res) => {
    const newKnowledge = new Knowledge({
        username: req.body.username,
        userID: req.body.userID,
        body: req.body.body,
        title: req.body.title,
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
        title: req.body.title,
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

KnowledgeRoute.post('/update/:id/true/:userID',authenToken, (req, res) => {
    Knowledge.findById(req.params.id)
        .then(data => {
            if ((data.react).indexOf(req.params.userID) == -1) {
                // console.log(data)
                Knowledge.findByIdAndUpdate(req.params.id,
                    { "$push": { "react": req.params.userID } },
                    { "new": true, "upsert": true }
                ).then((data) => {
                    // console.log(data.react)      
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


KnowledgeRoute.post('/update/:id/false/:userID',authenToken, (req, res) => {

    Knowledge.findByIdAndUpdate(req.params.id,
        { "$pull": { "react": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
        // console.log(data.react)      
    })
        .catch(err => console.log(err))
})
KnowledgeRoute.post('/update/:id', (req, res) => {

    Knowledge.findByIdAndUpdate(req.params.id, req.params,
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
        // console.log(data.react)      
    })
        .catch(err => console.log(err))
})



//Get a member by ID
KnowledgeRoute.get('/:id',authenToken,  (req, res) => {
    Knowledge.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

KnowledgeRoute.get('/load-data/:userID', authenToken, (req, res) => {
    Knowledge.find({ userID: req.params.userID })
        .then(data => {
            // console.log(data)
            res.send(data)
        })
        .catch(err => console.log(err))
})

/// Get all members
KnowledgeRoute.get('/', authenToken, (req, res) => {
    Knowledge.find({})
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
        })
})

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['x-access-token'];
    const token = authorizationHeader;
   
    if (!token) {
        res.status(401).send('Token het han');
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log('accept token')
        if (err) {
            res.sendStatus(401);
            return;
        }
        next();
    })

}

KnowledgeRoute.get('/load-data/newsfeed/random', authenToken, (req, res) => {
    Knowledge.aggregate([{ $sample: { size: 10 } }])
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

module.exports = KnowledgeRoute