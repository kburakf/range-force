const { server: { port } } = require('../config/environments/default');

exports.options = {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: `localhost:${port}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};
