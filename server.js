const express = require("express");
const connectDB = require("./utils/connectDb");
const dotenv = require("dotenv")

dotenv.config();
// call the connectDB function
connectDB();

const app = express();
const Post = require("./models/Posts/Posts");

const PORT = 5000;

app.listen(PORT, console.log("server is running")); // it is use to start the server it takes two arguments PORT and a callback function which tells that the server is running

app.use(express.json());

app.post("/api/v1/posts/create", async (req, res) => {
  try {
    const postBody = req.body;
    const postCreated = await Post.create(postBody);

    res.send({
      status: "success",
      message: "post created successfully",
      postCreated,
    });
  } catch (err) {
    res.send({ status: "failed", message: err.message });
  }
});







