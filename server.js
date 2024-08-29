const express = require("express");
const connectDB = require("./utils/connectDb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
// call the connectDB function
connectDB();

const app = express();

const Post = require("./models/Posts/Posts");

const PORT = 5000;

// cors middleware
const corsOptions = {
  origin: ["http://localhost:5173"], // Frontend URL
  credentials: true, // Set to true to allow cookies and authorization headers
};
app.use(cors(corsOptions));
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.post("/api/v1/posts/create", async (req, res) => {
  try {
    const postBody = req.body;
    const postCreated = await Post.create(postBody);

    res.send({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  } catch (err) {
    res.status(500).send({ status: "failed", message: err.message });
  }
});
