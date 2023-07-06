const ModuleSchema = require('../../schemas/module');
const { fastifyPlugins } = require('../../plugins/fastify');
const { ROLES } = require('../../constants');

const routes = [
  {
    method: 'POST',
    url: '/api/v1/modules',
    schema: ModuleSchema.create,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'ModuleController.create',
  },
  {
    method: 'PUT',
    url: '/api/v1/modules/:moduleId',
    schema: ModuleSchema.update,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'ModuleController.update',
  },
  {
    method: 'DELETE',
    url: '/api/v1/modules/:moduleId',
    schema: ModuleSchema.delete,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'ModuleController.delete',
  },
  {
    method: 'POST',
    url: '/api/v1/modules/:moduleId/start',
    schema: ModuleSchema.startTraining,
    preHandler: fastifyPlugins.jwtVerifyToken(),
    handler: 'ModuleController.startTraining',
  },
];

module.exports = routes;
