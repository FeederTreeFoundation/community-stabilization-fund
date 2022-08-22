import { readFileSync } from "fs";
import * as config from "./config.js";
const { mysql } = config;

// Load .env variables
// require("dotenv").config()

// Read SQL seed query
const seedQuery = readFileSync("src/db/schema.sql", {
  encoding: "utf-8",
})

// Connect to database
mysql.config({
  multipleStatements: true, // IMPORTANT
});
mysql.connect()

const conn = mysql.getClient()

// Generate random apiKey for initial admin user
// const psw = Math.random()
//   .toString(36)
//   .substring(2)
// const hash = bcrypt.hashSync(psw, 10)

console.log("Running SQL seed...")

// Run seed query
conn.query(seedQuery, (err) => {
  if (err) {
    throw err
  }

  console.log("SQL seed completed!")
  conn.end()
})