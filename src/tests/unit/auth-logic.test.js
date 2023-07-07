const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthLogic } = require('../../logic');
const { secretKeys } = require('../../config/environments/default');

jest.mock('bcrypt', () => ({
  hash: jest.fn((input, salt) => Promise.resolve(`hashed:${input}:${salt}`)),
  compare: jest.fn((input, hash) => Promise.resolve(input === hash)),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(
    (payload, secret, options) =>
      `signed:${JSON.stringify(payload)}:${secret}:${JSON.stringify(options)}`
  ),
  verify: jest.fn((token, secret) => {
    if (token === 'validToken') {
      return { id: '123', role: 'USER' };
    } else {
      throw new Error('Invalid token');
    }
  }),
}));

describe('AuthLogic', () => {
  describe('hashPassword', () => {
    test('should return a hashed password', async () => {
      const password = 'password';

      const result = await AuthLogic.hashPassword({ password });

      expect(result).toEqual('hashed:password' + secretKeys.pepper + ':10');
    });
  });

  describe('comparePassword', () => {
    test('should return true for matching password and hash', async () => {
      const password = 'password';
      const hash = 'hashed:password:' + secretKeys.pepper;

      const result = await AuthLogic.comparePassword({ password, hash });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password' + secretKeys.pepper,
        hash
      );
    });

    test('should return false for different password and hash', async () => {
      const password = 'password';
      const hash = 'hashed:wrongpassword:' + secretKeys.pepper;

      const result = await AuthLogic.comparePassword({ password, hash });

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password' + secretKeys.pepper,
        hash
      );
    });
  });

  describe('generateToken', () => {
    test('should return a signed JWT token', () => {
      const id = '123';

      const result = AuthLogic.generateToken({ id });

      expect(result).toEqual(
        `signed:{"id":"123","role":"USER"}:${secretKeys.tokenKey}:{"expiresIn":"30d"}`
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: '123', role: 'USER' },
        secretKeys.tokenKey,
        {
          expiresIn: '30d',
        }
      );
    });
  });

  describe('verifyToken', () => {
    test('should return the decoded token for a valid token', () => {
      const token = 'validToken';

      const result = AuthLogic.verifyToken({ token });

      expect(result).toEqual({ id: '123', role: 'USER' });
      expect(jwt.verify).toHaveBeenCalledWith(token, secretKeys.tokenKey);
    });

    test('should throw an error for an invalid token', () => {
      const token = 'invalidToken';

      expect(() => {
        AuthLogic.verifyToken({ token });
      }).toThrowError('Invalid token');
      expect(jwt.verify).toHaveBeenCalledWith(token, secretKeys.tokenKey);
    });
  });
});
