const ExceptionType = {
    TASK_TITLE_EMPTY: 'no data',
    TASK_TITLE_INVALID: 'incorrect task',
    TASK_USER_ID_INVALID: 'incorrect user_id',
    TASK_USER_ID_EMPTY: 'no user_id',
    ID_NOT_A_NUMBER: 'id is not a number',
    ID_NEGATIVE: 'id should not be negative',

    DB_GET_TASKS_NOT_FOUND: 'table tasks is empty',
    DB_GET_TASK_BY_ID_NOT_FOUND: 'task by id is not found',
    DB_POST_TASK_NOT_CREATE: 'task does not create',
    DB_PUT_TASK_NOT_UPDATE: 'task does not update',
    DB_DELETE_TASK_NOT_DELETE: 'task does not delete',
    DB_PATCH_TASK_NOT_PATCH: 'task does not patch'
}

module.exports = ExceptionType;