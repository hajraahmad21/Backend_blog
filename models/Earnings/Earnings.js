const mongoose = require("mongoose");
const EarningSchema = new mongoose.Schema({

userId:{type:mongoose.Schema.Types.ObjectId,ref:"User", required:true},
postId:{type:mongoose.Schema.Types.ObjectId, ref:"Post",required:true},
amount:{type:Number, required:true},
calculatedOn:{type:Date, default:Date.now()},
},{
    timestamps:true
})
modules.export = mongoose.model('Earning', EarningSchema)