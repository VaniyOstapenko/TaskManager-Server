const bcrypt = require('bcrypt');
const { getUserByEmail, createUserDB } = require('../repository/api.repository');
const ExceptionType = require('../exception/exception');

const salt = 10;

async function createUser(name, surname, email, pwd) {
  const user = await getUserByEmail(email);
  if (user.length) throw new Error(ExceptionType.CHECKING_EMAIL_USER);

  const hashPwd = await bcrypt.hash(pwd, salt);

  const data = await createUserDB(name, surname, email, hashPwd);
  if (!data.length) throw new Error(ExceptionType.AVAILABILITY_OR_ABSENCE_OF_DATA_USER);

  return data;
}

async function authUser(email, pwd) {
  const user = await getUserByEmail(email);
  if (!user.length) throw new Error(ExceptionType.CHECK_IF_THE_USER_EXIST);

  const pwdUserHash = user[0].pwd;

  if (!(await bcrypt.compare(pwd, pwdUserHash))) throw new Error(ExceptionType.PASSWORD_MATCH);

  return user;
}

module.exports = { createUser, authUser };
