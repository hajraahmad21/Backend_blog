const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({

userId:{type:mongoose.Schema.Types.ObjectId,ref:"User", required:true},
postId:{type:mongoose.Schema.Types.ObjectId, ref:"Post",required:true},
message:{type:String, required:true},
read:{type:Boolean, default:false},

},{
    timestamps:true
})

module.exports = mongoose.model('Notification', NotificationSchema)