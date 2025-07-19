const bcrypt = require("bcryptjs");
const db = require("../db/usersQueries");

const signUpGet = (req, res) => {
  res.render("sign_up");
};

const signUpPost = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render("sign_up", { error: "passwords do not match" });
  }
  try {
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      return res.render("sign_up", { error: "user already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.addUser({
      username,
      passwordHash: hash,
      isMember: false,
      isAdmin: false,
    });

    res.redirect("/log-in");
  } catch (err) {
    return next(err);
  }
};

const logInGet = (req, res) => {
  res.render("log_in");
};

const logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

module.exports = { signUpGet, signUpPost, logInGet, logOutGet };
