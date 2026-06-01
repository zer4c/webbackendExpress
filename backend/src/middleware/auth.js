const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { db } = require("../core/database");

const COLLECTION = "users";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await db
          .collection(COLLECTION)
          .doc(email)
          .set({ password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await db.collection(COLLECTION).doc(email).get();
        if (!user.exists) {
          return done(null, false, { message: "User not found" });
        }
        const pass_user = user.get("password");
        if (password != pass_user) {
          return done(null, false, { message: "wrong password" });
        }
        return done(null, user, { message: "login succesfull" });
      } catch (error) {
        retrun(error);
      }
    },
  ),
);
