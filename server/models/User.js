const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        require: true
    },
    doB: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true
    },
    friendArray: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        require: true
    },
    score: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    position: {
        type: String,
        require: true,
        default: "0"
    },
    reportedNum: {
        type: String,
        default: "0"
    }

})
module.exports = mongoose.model("User", UserSchema);