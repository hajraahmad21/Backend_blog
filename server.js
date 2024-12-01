const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./utils/connectDb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const postRouter = require("./router/post/postRouter");
const userRouter = require("./router/user/userRouter");
const categoryRouter = require("./router/category/CategoryRouter")
const passport = require("./utils/passport-config");

// call the connectDB function
connectDB();

const app = express();

const PORT = 5000;

// cors middleware
const corsOptions = {
  origin: ["http://localhost:5173"], // Frontend URL
  credentials: true, // Set to true to allow cookies and authorization headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());//middleware to parse cookies so if a user is logged in we can access it

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//Route Handlers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/categories", categoryRouter);

app.use((req, res, next) => {
  res.status(404).send({ status: "failed", message: "Route not found" });
});

// error middleware : Always use it after apis

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ status: "failed", message: err.message, stack: err.stack });
});
