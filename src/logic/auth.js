const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKeys } = require('../config/environments/default');

module.exports = class AuthLogic {
  static hashPassword({ password }) {
    return bcrypt.hash(password + secretKeys.pepper, 10);
  }

  static comparePassword({ password, hash }) {
    return bcrypt.compare(password + secretKeys.pepper, hash);
  }

  static generateToken({ id, role }) {
    return jwt.sign({ id: id.toString(), role }, secretKeys.tokenKey, {
      expiresIn: '30d',
    });
  }

  static verifyToken({ token }) {
    return jwt.verify(token, secretKeys.tokenKey);
  }
};
