const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    postID:{
        type:String,
        required:true,
    },
    senderID:{
        type: String,
    },
    action:{
        type: String,
    }
    ,
    type:{
        type:String,
    },

},
 {timestamps:true}
);

module.exports = mongoose.model("Notification", NotificationSchema);