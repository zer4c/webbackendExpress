const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { findUserByEmail, createUser } = require("../modules/auth/services");

const JWT = process.env.JWT;

passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await createUser(email, password);
        if (!user) {
          return done(null, false, { message: "User already exists" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        if (password !== user.password) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      // aqui me ayudo la IA buscando el fromAuthHeader ya que los tokens
      // se envian por Headers. y no queryparams como en el tutorial
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT,
    },
    async (jwtPayload, done) => {
      try {
        const user = await findUserByEmail(jwtPayload.email);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
