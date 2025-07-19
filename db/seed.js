require("dotenv").config();
const { Client } = require("pg");

const SQL = `
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        is_member BOOLEAN DEFAULT false,
        is_admin BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );

    INSERT INTO users (username, password_hash, is_member, is_admin)
    VALUES 
        ('alice@example.com', 'hashedpassword1', true, false),
        ('bob@example.com', 'hashedpassword2', true, true),
        ('guest@example.com', 'hashedpassword3', false, false);

    INSERT INTO messages (title, text, user_id)
    VALUES 
        ('Hello World', 'This is my first message!', 1),
        ('Admin Post', 'Only admins can see this.', 2),
        ('Guest Entry', 'I am just a guest.', 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
