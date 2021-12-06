const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    postID:{
        type:String,
        required:true,
    
    }, 
    type:{
        type:String,
        required:true,
    },
    posterID:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    },
    reporterID:{
        type:String,
    },
    censor:{
        type: String,
    },
    isSeen:{
        type:String,
    }
});
module.exports = mongoose.model("Report", ReportSchema);