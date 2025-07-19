const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function addUser(user) {
  await pool.query(
    "INSERT INTO users (username, password_hash, is_member, is_admin) VALUES ($1, $2, $3, $4)",
    [user.username, user.passwordHash, user.isMember, user.isAdmin]
  );
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function updateUserMembership(id, value) {
  await pool.query("UPDATE users SET is_member = $1 WHERE id = $2", [
    value,
    id,
  ]);
}

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  getUserByUsername,
  updateUserMembership,
};
