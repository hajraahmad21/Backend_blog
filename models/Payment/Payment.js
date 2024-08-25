const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User", required:true},
    reference:{type:String , required:true},
    currency:{type:String , required:true},
    status:{type:String , required:true, default:"pending"},
    subscriptionPlan:{type:mongoose.Schema.Types.ObjectId,ref:"Plan", required:true},
    amount:{type:Number, default:0},

},{
    timestamps:true
})
module.exports = mongoose.model('Payment', PaymentSchema)
