const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(`
  SELECT messages.*, users.username AS author
  FROM messages
  JOIN users ON messages.user_id = users.id
  ORDER BY created_at DESC
`);
  return rows;
}

async function createMessage(id, message) {
  await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)",
    [message.title, message.text, id]
  );
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  getAllMessages,
  createMessage,
  getMessageById,
  deleteMessage,
};
