const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User/User");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
// JWT-OPTIONS
const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies["token"]; // since we have set the cookies as token in request
      }
      return token;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};
//JWT
passport.use(
  new JWTStrategy(options, async (userDecoded, done) => {
    try {
      const user = await User.findById(userDecoded.id); // since in user controller we are using id  jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

//GOOGLE_OAUTH
passport.use(
  new GoogleStrategy({  
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/v1/users/auth/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    //accessToken is a temporary token which we get after user logsin and grants permission to access the profile
    //refresh Token is a token which helps us to get a new access token if its expires the user does not have to again go through the process and allow to grant the access
    //profile information of the user i.e name , address , idq
    //done is a callback function which is called after the process is done
    try {
      let user = await User.findOne({
        googleId: profile.id,
      });
      const {
        id,
        displayName,
        _json: { picture , given_name },
      } = profile;
       const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(given_name, salt);
      let email = "";
      if (Array.isArray(profile?.emails) && profile?.emails.length > 0) {
        email = profile?.emails[0]?.value;
      }
      if(!user)
      {
        user = await User.create({
          name:displayName,
          email,
          googleId: id,
          profilePicture:picture,
          authMethod:"google",
          password: hashedPassword,
        });
      }
      done(null , user)
    } catch (err) {
      console.error(err);
      return done(err, false);
    }
  }
));

module.exports = passport;
