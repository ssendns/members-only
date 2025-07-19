const db = require("../db/usersQueries");
require("dotenv").config();

const CLUB_SECRET = process.env.CLUB_SECRET;

const joinGet = (req, res) => {
  res.render("join");
};

const joinPost = async (req, res, next) => {
  const code = req.body.code;

  if (code !== CLUB_SECRET) {
    return res.render("join", { error: "invalid secret code" });
  }

  try {
    const id = req.user.id;

    await db.updateUserMembership(id, true);
    req.user.is_member = true;

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = { joinGet, joinPost };
