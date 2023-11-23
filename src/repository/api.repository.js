const pool = require('../db');

async function getUserByEmail(email) {
    const client = await pool.connect();
    const sql = `SELECT * FROM users WHERE email =$1`;

    const data = (await client.query(sql, [email])).rows;

    return data;
}

async function createUserDB(name, surname, email, hashPwd) {
    const client = await pool.connect();
    const sql = `INSERT INTO users(name, surname, email, pwd) 
    VALUES($1, $2, $3, $4) RETURNING *`;

    const data = (await client.query(sql, [name, surname, email, hashPwd])).rows;

    return data;
}

module.exports = { getUserByEmail, createUserDB };