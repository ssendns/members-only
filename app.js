require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const joinRouter = require("./routes/joinRouter");
const messagesRouter = require("./routes/messagesRouter");

require("./config/passport");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", joinRouter);
app.use("/", messagesRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
