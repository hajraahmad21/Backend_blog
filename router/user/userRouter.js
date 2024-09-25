const userRouter = require("express").Router();
const UserController = require("../../controllers/userController"); 

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/auth/google", UserController.googleAuth);
userRouter.get("/auth/callback", UserController.googleAuthCallback);
userRouter.get("/checkAuthenticated", UserController.checkAuthenticated);
module.exports = userRouter