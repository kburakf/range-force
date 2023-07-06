const ErrorMessages = require('../constants/error-messages');

module.exports = class CustomError {
  constructor(message) {
    this.message = message;
  }

  findErrorInErrorMessages() {
    return Object.values(ErrorMessages).find((error) => error.message === this.message);
  }
};
