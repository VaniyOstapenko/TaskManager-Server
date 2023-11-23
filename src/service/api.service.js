const bcrypt = require('bcrypt');
const { getUserByEmail, createUserDB } = require('../repository/api.repository');

const salt = 10;

async function createUser(name, surname, email, pwd) {
    const user = await getUserByEmail(email);
    if (user.length) throw new Error('user has already exist');

    const hashPwd = await bcrypt.hash(pwd, salt);

    const data = await createUserDB(name, surname, email, hashPwd);
    if (!data.length) throw new Error('not created');

    return data;
}

async function authUser(email, pwd) {
    const user = await getUserByEmail(email);
    if (!user.length) throw new Error('email not found');

    const pwdUserHash = user[0].pwd;

    if (!(await bcrypt.compare(pwd, pwdUserHash))) throw new Error('password does not match');

    return user;
}

module.exports = { createUser, authUser };