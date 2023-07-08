const CourseSchema = require('../../schemas/course');
const { fastifyPlugins } = require('../../plugins/fastify');
const { ROLES } = require('../../constants');

const routes = [
  {
    method: 'POST',
    url: '/api/v1/courses',
    schema: CourseSchema.create,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'CourseController.create',
  },
  {
    method: 'PUT',
    url: '/api/v1/courses/:courseId',
    schema: CourseSchema.update,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'CourseController.update',
  },
  {
    method: 'DELETE',
    url: '/api/v1/courses/:courseId',
    schema: CourseSchema.delete,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'CourseController.delete',
  },
  {
    method: 'POST',
    url: '/api/v1/courses/:courseId/modules/:moduleId',
    schema: CourseSchema.addModuleToCourse,
    preHandler: fastifyPlugins.jwtVerifyToken({ allowedRoles: [ROLES.ADMIN] }),
    handler: 'CourseController.addModuleToCourse',
  },
  {
    method: 'GET',
    url: '/api/v1/courses',
    schema: CourseSchema.listModulesByCourseName,
    preHandler: fastifyPlugins.jwtVerifyToken(),
    handler: 'CourseController.listModulesByCourseName',
  },
];

module.exports = routes;
