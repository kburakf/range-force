/* eslint-disable class-methods-use-this */
const redis = require('redis');
const bluebird = require('bluebird');

const {
  redis: { url },
} = require('../../config/environments/default');

let client = redis.createClient({ url });

client = bluebird.promisifyAll(client);

async function start() {
  client.on('error', (err) => {
    console.log('Redis connection error: ', err);

    client.disconnect();
  });

  await client.connect();

  console.log('Redis connected...');

  return true;
}

module.exports = {
  start,
  client,
};
