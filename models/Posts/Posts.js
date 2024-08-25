const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
    description:{type:String, required:true, trim:true, //required:true}
    },
    title:{type:String, required:true, trim:true},
    image:{type:Object},
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    nextEarningDate:{type:Date , default:()=> new Date(new Date().getFullYear(), new Date().getMonth()+1, 1)}, // dEFAULT TO first day of next month
    thisMonthEarnings:{type:Number, default:0},
    totalEarnings:{type:Number, default:0},
    // category:{type:mongoose.Schema.Types.ObjectId, ref:"Category", required:true},
    viewsCount:{type:Number, default:0},
    //Interactions
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    viewers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}],
    isBlocked:{type:Boolean, default:false},

},{
    timestamps:true
})
module.exports = mongoose.model('Post', PostSchema)