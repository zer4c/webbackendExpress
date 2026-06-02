const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { errorMiddleware } = require("../middleware/error.js");
require("../middleware/auth.js");

const todoItemRoutes = require("../modules/item/routes.js");
const authRoutes = require("../modules/auth/routes.js");
const driveRoutes = require("../modules/drive/routes.js");
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.use(
  "/todolist/item",
  passport.authenticate("jwt", { session: false }),
  todoItemRoutes,
);
app.use(
  "/drive",
  passport.authenticate("jwt", { session: false }),
  driveRoutes,
);

app.use(errorMiddleware);

module.exports = app;
