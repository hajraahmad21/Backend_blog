const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const userController = {
  register: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const userExists = await User.findOne({ name, email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user,
    });
  }),
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });
      // generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //set the token in cookie and send response
      // This cookie will be stored on the user's browser, and on future requests, the client will send this cookie back to the server
      res.cookie("token", token, {
        httpOnly: true, // it is only accessible by the server no client side javascript can access it
        secure: false, // since we are using http so we will make the secure false but when using production it should be true
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      return res.status(200).json({
        message: "Login success",
        username: user.name,
        email: user.email,
        id: user._id,
      });
    })(req, res, next);
  }),
  googleAuth: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      "google",
      { failureRedirect: "/login", session: false },
      (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res.redirect("/http://localhost:5173/google-login-error");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
        // set token into cookies
        res.cookie({
          token: token,
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.redirect("http://localhost:5173/dashboard");
      }
    )(req, res, next); //we are using iif (immediately invoked function expression) here to call the function
  }),
  // !Authentication Stattus
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        return res.status(200).json({
          status: "success",
          message: "User found",
          user,
        });
      }
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }),
};
module.exports = userController;
