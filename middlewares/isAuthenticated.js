const passport = require("passport");
const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, info, user) => {
    if (!info) {
      return res
        .status(401)
        .json({
          message: info ? info.message : "Unauthorized",
          error: error ? error?.message : undefined,
        });
    }
    req.user = info?._id;
    return next();
  })(req, res, next);
};
module.exports = isAuthenticated;
