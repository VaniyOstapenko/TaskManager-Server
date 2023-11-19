const pool = require('../db');

async function getAllUsersDB() {
  const client = await pool.connect();
  const sql = `SELECT * FROM users`;

  const data = (await client.query(sql)).rows;

  return data;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = `SELECT * FROM users WHERE id = $1`;

  const data = (await client.query(sql, [id])).rows;

  return data;
}

async function createUsersDB(name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO users(name, surname, email, pwd) VALUES
    ($1, $2, $3, $4) returning *`;

    const data = (await client.query(sql, [name, surname, email, pwd])).rows;

    await client.query('COMMIT');

    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`createUsersDB: ${error.message}`);

    return [];
  }
}

async function updateUserByIdDB(id, name, surname, email, pwd) {
  const client = await pool.connect();

  try {
    const sql = `UPDATE users SET name =$1, surname =$2, email =$3, pwd =$4
    WHERE id =$5 returning *`;

    const data = (await client.query(sql, [name, surname, email, pwd, id])).rows;

    await client.query('COMMIT');

    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`updateUserDB: ${error.message}`);

    return [];
  }
}

async function patchUserByIdDB(id, clientObj) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql = `SELECT * FROM users WHERE id =$1`;
    const oldObj = (await client.query(sql, [id])).rows;

    const newObj = { ...oldObj[0], ...clientObj };

    const sqlUpdate = `UPDATE users SET name =$1, surname =$2, email =$3, 
    pwd =$4 WHERE id =$5 returning *`;

    const result = (await client.query(sqlUpdate, [newObj.name, newObj.surname, newObj.email, newObj.pwd, id])).rows;

    await client.query('COMMIT');

    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`patchUserDB: ${error.message}`);

    return [];
  }
}

async function deleteUserByIdDB(id) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql = `DELETE FROM users WHERE id =$1 returning *`;

    const data = (await client.query(sql, [id])).rows;

    await client.query('COMMIT');

    return data;
  } catch (error) {
    await client.query('ROLLBAK');
    console.log(`deleteUserDB: ${error.message}`);

    return [];
  }
}

module.exports = { getAllUsersDB, createUsersDB, getUserByIdDB, updateUserByIdDB, patchUserByIdDB, deleteUserByIdDB };
