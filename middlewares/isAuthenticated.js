const passport = require("passport");
const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, info, user) => {
    if (!info) {
      console.log("error",error , "user",user , "info",info , "inside if")
      return res
        .status(401)
        .json({
          message: info ? info.message : "Unauthorized",
          error: error ? error?.message : undefined,
        });
    }
    console.log("info",info , "user",user , "error",error)
    req.user = info?._id;
    return next();
  })(req, res, next);
};
module.exports = isAuthenticated;
