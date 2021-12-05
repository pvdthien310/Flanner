const jwt = require('jsonwebtoken');
const JWTRefTokens = require('../models/JWTRefTokens');
const JWTRoute = require('express').Router();
JWTRoute.get('/get-full-refreshToken', (req, res) => {
    JWTRefTokens.find({})
        .then(data => {
            res.send(data[0])
        })
        .catch(err => console.log(err))
})

JWTRoute.post('/send-data', (req, res) => {
    const _JWTRefTokens = new JWTRefTokens({
        refreshTokens: req.body.refreshTokens
    })

    _JWTRefTokens.save()
        .then((data) => {
            console.log(data)
            res.send("Add Success")
        })
        .catch(err => {
            console.log('Error')
        })
})
JWTRoute.post('/update/add', (req, res) => {

    JWTRefTokens.findByIdAndUpdate('61a3b4c93b737600e720e39f',
        { "$push": { "refreshTokens": req.params.RefToken} },
        { "new": true, "upsert": true }
    ).then((data) => {  
        res.send(data)})
        .catch(err => console.log(err))
})
JWTRoute.post('/update/remove', (req, res) => {

    JWTRefTokens.findByIdAndUpdate('61a3b4c93b737600e720e39f',
        { "$pull": { "refreshTokens": req.params.RefToken} },
        { "new": true, "upsert": true }
    ).then((data) => {  
        res.send(data)})
        .catch(err => console.log(err))
})



module.exports = JWTRoute