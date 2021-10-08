const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    userID:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    posttime:{
        type:String,
    },
    listImage:{
        type: Array,
    },
    react:{
        type:Boolean,
        default:false
    },
    reactNumber:{
        type:String,
    }
}
);

module.exports = mongoose.model("Status", StatusSchema);