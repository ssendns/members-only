const db = require("../db/messagesQueries");

const index = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { messages });
};

const newMessageGet = (req, res) => {
  res.render("new_message");
};

const newMessagePost = async (req, res) => {
  const { title, text } = req.body;
  const id = req.user.id;
  await db.createMessage(id, { title, text });
  console.log("created");
  res.redirect("/");
};

const deleteMessage = async (req, res) => {
  if (!req.user.is_admin) return res.redirect("/");
  const id = Number(req.params.id);
  await db.deleteMessage(id);
  res.redirect("/");
  console.log("deleted");
};

module.exports = {
  index,
  newMessageGet,
  newMessagePost,
  deleteMessage,
};
