const EmailRoute = require('express').Router();
const Email = require("../models/Email")
const sendMail = require("../../gmail-api/sendEmail")

const value = {
    from: 'flanerapplication <trithuc23232@gmail.com>',
    to: '19522321@gm.uit.edu.vn',
    subject: "hello",
    html: '<h1>shin ne html</h1>'
}

EmailRoute.post('/', (req, res) => {
    const newEmail = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html
    }
    console.log(newEmail)
    console.log(value)
    sendMail({ value })


})

module.exports = EmailRoute