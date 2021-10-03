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
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    }
})
module.exports = mongoose.model("User", UserSchema);