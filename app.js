require('dotenv').config();
const Server = require('./src/server/server');
const MongooseConnection = require('./src/bootstrap/modules/mongoose');
const RedisConnection = require('./src/bootstrap/modules/redis');

async function app() {
  const mongooseConnection = new MongooseConnection();
  const server = new Server();

  await mongooseConnection.start();
  RedisConnection.start();
  await server.start();
}

app().catch(console.log);
