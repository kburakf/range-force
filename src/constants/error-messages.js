const { BadRequestGenericError } = require('../errors/generics');
const ERROR_LEVELS = require('../errors/levels');

module.exports = {
  UNKNOWN: {
    error: 'UnknownError',
    message: 'unknown error',
    code: -1,
  },
  VALIDATION: {
    error: 'ValidationError',
    code: -2,
  },
  MICROSERVICE: {
    error: 'MicroserviceError',
    message: 'microservice error',
    code: -3,
  },
  EXAMPLE: {
    parent: BadRequestGenericError,
    error: 'ExampleNotFound',
    level: ERROR_LEVELS.WARN,
    message: 'Example not found!',
    code: 100,
  },
};
