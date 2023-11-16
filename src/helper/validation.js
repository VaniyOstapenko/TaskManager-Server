const ExceptionType = require('../exception/exception');

function isValidTaskBody(req, res, next) {
    const { task, user_id } = req.body;

    if (!task) throw new Error(ExceptionType.TASK_TITLE_EMPTY);
    if (!isNaN(task)) throw new Error(ExceptionType.TASK_TITLE_INVALID);
    if (isNaN(user_id)) throw new Error(ExceptionType.TASK_USER_ID_INVALID);
    if (!user_id) throw new Error(ExceptionType.TASK_USER_ID_EMPTY);

    next();
}

function isValidId(req, res, next) {
    const { id } = req.params;

    if (!id) throw new Error(ExceptionType.DB_GET_TASK_BY_ID_NOT_FOUND);
    if (isNaN(id)) throw new Error(ExceptionType.ID_NOT_A_NUMBER);
    if (id < 1) throw new Error(ExceptionType.ID_NEGATIVE);

    next()
}

function isValidUserBody(req, res, next) {
    const { name, surname, email, pwd } = req.body;

    if (!name) throw new Error(ExceptionType.TASK_TITLE_EMPTY);
    if (!surname) throw new Error(ExceptionType.TASK_TITLE_EMPTY);
    if (!email) throw new Error(ExceptionType.TASK_TITLE_EMPTY);
    if (!pwd) throw new Error(ExceptionType.TASK_TITLE_EMPTY);
    if (!isNaN(name)) throw new Error(ExceptionType.USER_TITLE_INVALID);
    if (!isNaN(surname)) throw new Error(ExceptionType.USER_TITLE_INVALID);
    if (pwd.length < 8) throw new Error(ExceptionType.USER_PWD_INVALID);
    if(!/^[\w\W]+@+[a-z]+\.+[a-z]{2,4}$/gm.test(email)) throw new Error(ExceptionType.USER_EMAIL_INVALID);

        next();
}

module.exports = { isValidTaskBody, isValidId, isValidUserBody };