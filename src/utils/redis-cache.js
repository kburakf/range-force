const moment = require('moment');

const { client } = require('../bootstrap/modules/redis');

module.exports = class RedisCache {
  constructor() {
    this.redisClient = client;
  }

  async increaseModuleCount({ moduleName }) {
    const { redisClient } = this;

    await redisClient.zIncrBy('modules:count', 1, moduleName);

    const currentDate = moment();
    const endOfMonth = moment().endOf('month');
    const timeDiffInSeconds = endOfMonth.diff(currentDate, 'seconds');

    redisClient.expire('modules:count', timeDiffInSeconds);

    return true;
  }

  async getTop10Modules() {
    const { redisClient } = this;

    const top10Keys = await redisClient.sendCommand([
      'ZREVRANGE',
      'modules:count',
      '0',
      '9',
      'WITHSCORES',
    ]);

    if (top10Keys.length) {
      const formattedKeys = [];

      for (let i = 0; i < top10Keys.length; i += 2) {
        const moduleName = top10Keys[i];
        const count = parseInt(top10Keys[i + 1], 10);
        formattedKeys.push({ moduleName, count });
      }

      return formattedKeys;
    }

    return [];
  }
};
