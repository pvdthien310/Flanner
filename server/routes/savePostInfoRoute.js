
const SavePostInfoRoute = require('express').Router();
const SavePostInfo = require("../models/SavedPostInfo");
const jwt = require('jsonwebtoken')


/// Delete member
SavePostInfoRoute.post('/delete', authenToken, (req, res) => {
    SavePostInfo.findByIdAndRemove(req.body.id)
        .then((data) => {
            res.send("delete lien")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
SavePostInfoRoute.post('/send-data', (req, res) => {
    const newSavedPost = new SavePostInfo({      
        userID: req.body.userID,
        postIDList: []
    })
    newSavedPost.save()
        .then((data) => {
            // console.log(data)
            res.send("Add Success")
        })
        .catch(err => {
            console.log('Error')
        })
})


SavePostInfoRoute.post('/update/:id/true/:userID', (req, res) => {
    SavePostInfo.findOne({userID : req.params.id})
        .then(data => {
            if ((data.postIDList).indexOf(req.params.userID) == -1) {
                SavePostInfo.findOneAndUpdate({userID : req.params.id},
                    { "$push": { "postIDList": req.params.userID } },
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


SavePostInfoRoute.post('/update/:id/false/:userID', (req, res) => {
    SavePostInfo.findOneAndUpdate({userID : req.params.id},
        { "$pull": { "postIDList": req.params.userID } },
        { "new": true, "upsert": true }
    ).then((data) => {
        res.send(data)
        // console.log(data.react)      
    })
        .catch(err => console.log(err))
})




//Get a member by ID
SavePostInfoRoute.get('/load-data/:userID', (req, res) => {
    SavePostInfo.findOne({ userID: req.params.userID })
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
})
/// Get all members
SavePostInfoRoute.get('/', (req, res) => {
    SavePostInfo.find({})
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



module.exports = SavePostInfoRoute