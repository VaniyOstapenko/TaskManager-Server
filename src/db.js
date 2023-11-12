const { config } = require('dotenv');
const { Pool } = require('pg');

config();
const { PASSWORD, DATABASE, DB_HOST, DB_PORT, DB_USER } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DATABASE,
  password: PASSWORD,
  port: DB_PORT,
});

module.exports = pool;
