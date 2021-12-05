const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    
    }, 
    postID:{
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
    posttime:{
        type:String,
    },
    react:{
        type:Array,
    }
},
 {timestamps:true}
);

module.exports = mongoose.model("Comment", CommentSchema);