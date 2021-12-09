const mongoose = require('mongoose');

const SavePostInfoSchema = new mongoose.Schema({
   
    userID:{
        type:String, 
        required:true,
    },
    postIDList:{ 
        type:Array,
    }
},
);

module.exports = mongoose.model("Savepost", SavePostInfoSchema);