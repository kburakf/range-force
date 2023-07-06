module.exports = class CommonLogic {
  static isEmailSame({ newEmail, oldEmail }) {
    return newEmail === oldEmail;
  }
};
