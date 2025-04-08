const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in database");
          return done(err);
        }
        console.log(user);
        if (!user || user.password != password) {
          console.log("data is not present in database");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in fetching the data");
      return done(err);
    }
    return done(null, user);
  });
});
passport.authuser = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/signin");
};
passport.setuser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
