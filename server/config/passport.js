const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// user Model
const Users = require("../database/schemas/users");

module.exports = async function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //Match User
        Users.findOne({ email }, function (err, user) {
          if (err) console.log(err);
          if (!user) {
            return done(null, false, { message: "Wrong Email" });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) console.log(err);

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong Password" });
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
