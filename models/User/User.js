const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

    name:{type:String, required:true},
    profilePicture:{type:Object, default:null},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    googleId:{type:String, required:true, unique:true},
    authMethod:{type:String, enum:["google", "local", "facebook", "github"], required:true, default:"local"},
    passwordResetToken:{type:String, default:null},
    accountVerificationToken:{type:String, default:null},
    accountVerificationExpires:{type:Date, default:null},
    passwordResetExpires:{type:Date, default:null},
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
     totalEarnings: { type: Number, default: 0 },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // Sets to the first day of the next month
    },
    Plan: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Plan",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
    hasSelectedPlan: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },

    // User relationships
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Link to other users
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

})
module.exports = mongoose.model('User', UserSchema)