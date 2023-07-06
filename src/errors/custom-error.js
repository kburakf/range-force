module.exports = class CustomError extends Error {
  constructor(level, message, code, statusCode = 500, data) {
    super(message);

    this.level = level;
    this.code = code;
    this.data = data;
    this.statusCode = statusCode;
  }
};
