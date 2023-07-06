/* eslint-disable no-throw-literal */
const fastifyPlugins = require('fastify')();
const jwt = require('jsonwebtoken');
const { TokenNotFoundError, TokenExpiredError } = require('../../errors/types');
const { secretKeys } = require('../../config/environments/default');

fastifyPlugins.decorate(
  'jwtVerifyToken',
  ({ allowedRoles = [] } = {}) => function (req, res, next) {
    let { token } = req.headers;

    if (!token) {
      throw new TokenNotFoundError();
    }

    try {
      token = jwt.verify(token, secretKeys.tokenKey);
    }
    catch (error) {
      throw new TokenExpiredError();
    }

    if (allowedRoles.length) {
      const { role } = token;

      if (!role || (role && !allowedRoles.includes(role))) {
        throw {
          statusCode: 403,
          message: 'You do not have permission for this request.',
        };
      }

      if (!req.body) {
        req.body = { role };
      }

      req.body.role = role;
    }

    req.params.id = token.id;

    next();
  },
);

module.exports = {
  fastifyPlugins,
};
