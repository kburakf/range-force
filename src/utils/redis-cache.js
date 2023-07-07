const moment = require('moment');

const { client } = require('../bootstrap/modules/redis');

module.exports = class RedisCache {
  constructor() {
    this.redisClient = client;
  }

  async increaseModuleCount({ moduleId }) {
    const { redisClient } = this;

    await redisClient.zIncrBy('modules:count', 1, moduleId);

    const currentDate = moment();
    const endOfMonth = moment().endOf('month');
    const timeDiffInSeconds = endOfMonth.diff(currentDate, 'seconds');

    redisClient.expire('modules:count', timeDiffInSeconds);

    return true;
  }

  async getTop10Modules() {
    const { redisClient } = this;

    const test = await redisClient.sendCommand([
      'ZREVRANGE',
      'modules:count',
      '0',
      '9',
    ]);

    console.log(test);
  }
};
