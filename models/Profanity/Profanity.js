const mongoose = require("mongoose");
const ProfanitySchema = new mongoose.Schema({
    bannedWords:[String],
})
module.exports=mongoose.model('Profanity', ProfanitySchema)