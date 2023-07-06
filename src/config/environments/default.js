const SERVICE = require('../../constants/services');

module.exports = {
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/fastify-template-db',
  },
  server: {
    port: process.env.PORT || 3000,
  },
  rateLimit: {
    MAX_RETRY: 10000,
    ONE_MINUTE: '1 minute',
  },
  serviceUrls: {
    [SERVICE.example]: process.env.SERVICE_CHUCK_NORRIS_URL || 'https://example-api.com',
  },
};
