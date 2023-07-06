/* eslint-disable class-methods-use-this */
const fastify = require('fastify')({ logger: true });
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const fastifyRateLimit = require('@fastify/rate-limit');
const swagger = require('../config/swagger');
const { setup, routes } = require('../bootstrap/container');
const {
  server: { port },
  rateLimit,
} = require('../config/environments/default');

setup();

module.exports = class Server {
  async setup() {
    await fastify.register(fastifyRateLimit, {
      max: rateLimit.MAX_RETRY,
      timeWindow: rateLimit.ONE_MINUTE,
    });

    await fastify.register(fastifySwagger, swagger.options);

    await fastify.register(fastifySwaggerUi);
  }

  async start() {
    await this.setup();

    routes().map((endpoint) => fastify.route(endpoint));

    await fastify.ready();

    await fastify.listen({ port }, (err, address) => {
      if (err) throw err;

      console.log(`Server is running on ${address}`);
    });

    return fastify;
  }

  stop() {
    fastify.close().then(
      () => {
        console.log('successfully closed!');
      },
      (err) => {
        console.log('an error happened', err);
      },
    );
  }
};
