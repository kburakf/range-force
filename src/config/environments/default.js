const SERVICE = require('../../constants/services');

module.exports = {
  env: process.env.NODE_ENV || 'dev',
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/range-force-db',
  },
  server: { port: process.env.PORT || 3000 },
  rateLimit: { maxRetry: 10000, oneMinute: '1 minute' },
  serviceUrls: {
    [SERVICE.example]:
      process.env.SERVICE_CHUCK_NORRIS_URL || 'https://example-api.com',
  },
  secretKeys: {
    tokenKey: process.env.TOKEN_KEY || 't0k3n',
    pepper: process.env.PEPPER || 'p3pp3r',
  },
};
