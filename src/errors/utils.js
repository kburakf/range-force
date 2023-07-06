// eslint-disable-next-line max-classes-per-file
const CustomError = require('./custom-error');

/**
 * Creates an error group, that may be extended further to create custom errors.
 *
 * @param klass the name of the error group
 * @param statusCodeDefault the default http status code to use for this type of errors
 * @returns {*}
 */
const createGenericErrorType = (klass, statusCodeDefault = 500) => ({
  [klass]:
    class extends CustomError {
      constructor(level, message, code, statusCode, data) {
        super(level, message, code, statusCode || statusCodeDefault, data);

        if (this.constructor.name === klass) {
          throw new TypeError(`Abstract class "${klass}" cannot be instantiated directly.`);
        }
      }
    },
}[klass]);

/**
 * Creates a custom error type to be used, when throwing and checking errors.
 *
 * @param extendClass one of the members of group of errors, that extend CustomError
 * @param klass the name of the class to be created
 * @param level the level for the error
 * @param message the message for the error instances to have
 * @param code the unique code for the error
 * @param statusCode the status code to use when responding to http requests
 * @returns {*}
 */
const createCustomErrorType = (extendClass, klass, level, message, code, statusCode) => ({
  [klass]:
    class extends extendClass {
      constructor(data) {
        super(level, message, code, statusCode, data);
      }
    },
}[klass]);

module.exports = {
  createGenericErrorType,
  createCustomErrorType,
};
