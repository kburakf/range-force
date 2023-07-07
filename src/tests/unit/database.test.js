const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const redis = require('redis-mock');

let mongoServer;
let mongoClient;
let redisClient;

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = await mongoServer.getUri();

    mongoClient = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoClient.close();
    await mongoServer.stop();
  });

  test('should connect to MongoDB successfully', async () => {
    expect(mongoClient.topology.isConnected()).toBe(true);
  });

  test('should be able to perform database operations', async () => {
    const dbName = mongoClient.db().databaseName;
    const collection = mongoClient.db(dbName).collection('testCollection');
    const document = { name: 'Range Force' };
    await collection.insertOne(document);
    const result = await collection.findOne({ name: 'Range Force' });

    expect(result).toEqual(document);
  });
});

describe('Redis Connection', () => {
  beforeAll(() => {
    redisClient = redis.createClient();
  });

  afterAll(() => {
    redisClient.quit();
  });

  test('should connect to Redis successfully', (done) => {
    redisClient.on('connect', () => {
      expect(redisClient.connected).toBeTruthy();
      done();
    });
  });

  test('should be able to perform cache operations', (done) => {
    const key = 'testKey';
    const value = 'testValue';
    redisClient.set(key, value, (err, reply) => {
      expect(reply).toEqual('OK');

      redisClient.get(key, (err, cachedValue) => {
        expect(cachedValue).toEqual(value);
        done();
      });
    });
  });
});
