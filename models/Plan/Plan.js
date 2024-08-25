const mongoose = require("mongoose");
const PlanSchema =new mongoose.Schema({

    planName:{type:String, required:true},
    features:[String],
    limitations:[String],
    price:{type:Number, required:true},

},{
    timestamps:true
})
module.exports = mongoose.model('Plan', PlanSchema)