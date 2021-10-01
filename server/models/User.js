const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true,
        default: ""
    },
    address: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        require: false
    }
})
module.exports = mongoose.model("User", UserSchema);