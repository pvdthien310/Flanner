const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min: 1 ,
        max: 20,
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
        default:[]
    },
    react:{
        type:Boolean,
        default:false
    },
    reactNumber:{
        type:String,
    }
},
 {timestamps:true}
);

module.exports = mongoose.model("Status", StatusSchema);