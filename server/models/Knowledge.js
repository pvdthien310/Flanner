const mongoose = require('mongoose');

const KnowledgeSchema = new mongoose.Schema({
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
},
 {timestamps:true}
);

module.exports = mongoose.model("Knowledge", KnowledgeSchema);