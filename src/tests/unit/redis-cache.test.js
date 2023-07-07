const moment = require('moment');
const RedisCache = require('../../utils/redis-cache');
const { client } = require('../../bootstrap/modules/redis');

jest.mock('moment', () =>
  jest.fn(() => ({
    endOf: jest.fn(() => ({
      diff: jest.fn(() => 10),
    })),
  }))
);

jest.mock('../../bootstrap/modules/redis', () => ({
  client: {
    zIncrBy: jest.fn(),
    expire: jest.fn(),
    sendCommand: jest.fn(() => ['module1', '10', 'module2', '8']),
  },
}));

describe('RedisCache', () => {
  let redisCache;

  beforeEach(() => {
    redisCache = new RedisCache();
  });

  describe('increaseModuleCount', () => {
    test('should increment module count and set expiration', async () => {
      const moduleName = 'module1';

      const result = await redisCache.increaseModuleCount({ moduleName });

      expect(result).toBe(true);
      expect(client.zIncrBy).toHaveBeenCalledWith(
        'modules:count',
        1,
        moduleName
      );
      expect(moment).toHaveBeenCalled();
      expect(client.expire).toHaveBeenCalledWith('modules:count', 10);
    });
  });

  describe('getTop10Modules', () => {
    test('should return top 10 modules with counts', async () => {
      const result = await redisCache.getTop10Modules();

      expect(result).toEqual([
        { moduleName: 'module1', count: 10 },
        { moduleName: 'module2', count: 8 },
      ]);
      expect(client.sendCommand).toHaveBeenCalledWith([
        'ZREVRANGE',
        'modules:count',
        '0',
        '9',
        'WITHSCORES',
      ]);
    });

    test('should return empty array if no top modules found', async () => {
      client.sendCommand.mockResolvedValue([]);

      const result = await redisCache.getTop10Modules();

      expect(result).toEqual([]);
      expect(client.sendCommand).toHaveBeenCalledWith([
        'ZREVRANGE',
        'modules:count',
        '0',
        '9',
        'WITHSCORES',
      ]);
    });
  });
});
