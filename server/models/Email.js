const mongoose = require('mongoose')

const EmailSchema = new mongoose.Schema({
    from: {
        type: String,
        default: 'flanerapplication<trithuc23232@gmail.com>'
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        require: true
    },
    html: {
        type: String,
        require: true
    },


})
module.exports = mongoose.model("Email", EmailSchema);