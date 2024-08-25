const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // we want to save an array of post ids so that is why we have used posts:[]
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Category', categorySchema)
