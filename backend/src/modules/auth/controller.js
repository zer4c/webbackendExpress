const passport = require("passport");
const jwt = require("jsonwebtoken");

const JWT = process.env.JWT;

function signup(req, res, next) {
  passport.authenticate("signup", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        status: 400,
        detail: info.message,
      });
    }

    return res.status(201).json({
      ok: true,
      status: 201,
      detail: "User created successfully",
      data: { email: user.email },
    });
  })(req, res, next);
}

function login(req, res, next) {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        ok: false,
        status: 401,
        detail: info.message,
      });
    }
    const token = jwt.sign({ email: user.email }, JWT, { expiresIn: "24h" });

    return res.status(200).json({
      ok: true,
      status: 200,
      detail: "Login successful",
      data: {
        access_token: token,
        token_type: "bearer",
      },
    });
  })(req, res, next);
}

module.exports = { signup, login };
