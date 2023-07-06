const {
  BadRequestGenericError,
  NotFoundGenericError,
} = require('../errors/generics');
const ERROR_LEVELS = require('../errors/levels');

module.exports = {
  UNKNOWN: { error: 'UnknownError', message: 'unknown error', code: -1 },
  VALIDATION: { error: 'ValidationError', code: -2 },
  MICROSERVICE: {
    error: 'MicroserviceError',
    message: 'microservice error',
    code: -3,
  },
  EMAIL_IN_USE: {
    parent: BadRequestGenericError,
    error: 'EmailInUseError',
    level: ERROR_LEVELS.WARN,
    message: 'This e-mail is already in use.',
    code: 100,
  },
  SAME_PASSWORD: {
    parent: NotFoundGenericError,
    error: 'SamePasswordError',
    level: ERROR_LEVELS.ERROR,
    message:
      'The entered password is the same as before. Please enter a new password.',
    code: 101,
  },
  WRONG_PASSWORD: {
    parent: BadRequestGenericError,
    error: 'WrongPassword',
    level: ERROR_LEVELS.WARN,
    message: 'Wrong password.',
    code: 102,
  },
  TOKEN_EXPIRED: {
    parent: BadRequestGenericError,
    error: 'TokenExpiredError',
    level: ERROR_LEVELS.ERROR,
    message: 'Token expired.',
    code: 103,
  },
  USER_NOT_FOUND: {
    parent: BadRequestGenericError,
    error: 'UserNotFoundError',
    level: ERROR_LEVELS.ERROR,
    message: 'User not found.',
    code: 104,
  },
  SAME_EMAIL: {
    parent: NotFoundGenericError,
    error: 'SameEmailError',
    level: ERROR_LEVELS.ERROR,
    message:
      'The entered e-mail is the same as before. Please enter a new e-mail.',
    code: 112,
  },
  TOKEN_NOT_FOUND: {
    parent: BadRequestGenericError,
    error: 'TokenNotFoundError',
    level: ERROR_LEVELS.ERROR,
    message: 'Token not found in header.',
    code: 122,
  },
  MODULE_EXIST: {
    parent: BadRequestGenericError,
    error: 'ModuleExistError',
    level: ERROR_LEVELS.ERROR,
    message: 'Given module name is already exist.',
    code: 122,
  },
  MODULE_NOT_FOUND: {
    parent: BadRequestGenericError,
    error: 'ModuleNotFoundError',
    level: ERROR_LEVELS.ERROR,
    message: 'Module not found.',
    code: 104,
  },
};
