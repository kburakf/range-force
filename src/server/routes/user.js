const UserSchema = require('../../schemas/user');
const { fastifyPlugins } = require('../../plugins/fastify');

const routes = [
  {
    method: 'POST',
    url: '/api/v1/users/signup',
    schema: UserSchema.signup,
    handler: 'UserController.signup',
  },
  {
    method: 'POST',
    url: '/api/v1/users/login',
    schema: UserSchema.login,
    handler: 'UserController.login',
  },
  {
    method: 'PUT',
    url: '/api/v1/users/:userId',
    schema: UserSchema.update,
    preHandler: fastifyPlugins.jwtVerifyToken(),
    handler: 'UserController.updateUserDetail',
  },
];

module.exports = routes;
