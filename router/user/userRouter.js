const userRouter = require("express").Router();
const UserController = require("../../controllers/userController"); 
const isAuthenticated = require("../../middlewares/isAuthenticated")

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/auth/google", UserController.googleAuth); // login with google
userRouter.get("/auth/callback", UserController.googleAuthCallback);// signup with google
userRouter.get("/checkAuthenticated", UserController.checkAuthenticated);
userRouter.post("/logout", UserController.logout);
userRouter.get("/profile",isAuthenticated, UserController.profile);
module.exports = userRouter 