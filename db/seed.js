require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

async function main() {
  console.log("seeding...");

  const hash = await bcrypt.hash("123", 10);

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
        ('alice', '${hash}', true, false),
        ('bob', '${hash}', true, true),
        ('guest', '${hash}', false, false);

    INSERT INTO messages (title, text, user_id)
    VALUES 
        ('hellooo', 'this is my first message!', 1),
        ('admin post', 'i am admin', 2);
  `;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
