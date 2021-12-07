
const ReportRoute = require('express').Router();
const Report = require("../models/Report")
const jwt = require('jsonwebtoken')



/// Delete member
ReportRoute.post('/delete', (req, res) => {
    Report.findByIdAndRemove(req.body.id)
        .then((data) => {
            console.log("Delete Success")
            res.send("delete")
        }).catch(err => {
            console.log("error", err)
        })
})

/// Add new member
ReportRoute.post('/send-data',authenToken, (req, res) => {
    Report.find({ postID: req.body.postID, reporterID: req.body.reporterID })
        .then(data => {
            console.log(data)
            if (data.length > 0)
                res.send('Duplicate')
            else {
                const newReport = new Report({
                    postID: req.body.postID,
                    reason: req.body.reason,
                    posterID: req.body.posterID,
                    reporterID: req.body.reporterID,
                    censor: req.body.censor,
                    isSeen: req.body.isSeen,
                    type: req.body.type
                })
                // console.log(newReport)
                newReport.save()
                    .then((data) => {
                        res.send(data)
                    })
                    .catch(err => {
                        console.log('Error')
                    })
            }

        }
        )
        .catch(err => console.log(err))


})

/// Update member by ID

ReportRoute.post('/update/isSeen/:postID', (req, res) => {
    Report.updateMany({ postID: req.params.postID }, { "isSeen": 'true' }, { new: true })
        .then((data) => {
            res.send('update thanh cong')
        }).catch(err => {
            console.log(err)
        })
})


function authenToken(req, res, next) {
    const authorizationHeader = req.headers['x-access-token'];
    const token = authorizationHeader;
    if (!token) {
        res.Status(401).send('Token het han');
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

//Get a member by ID
ReportRoute.get('/:id', authenToken, (req, res) => {
    Report.findById(req.params.id)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})


ReportRoute.get('/load-data/:userID', authenToken, (req, res) => {
    Report.find({ posterID: req.params.userID })
        .then(data => res.send(data))
        .catch(err => console.log(err))
})


/// Get all members
ReportRoute.get('/', authenToken, (req, res) => {
    Report.find({})
        .then(data => {
            // console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})


module.exports = ReportRoute