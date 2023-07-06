require('dotenv').config();
const Server = require('./src/server/server');
const MongooseConnection = require('./src/bootstrap/modules/mongoose');

async function app() {
  const mongooseConnection = new MongooseConnection();
  const server = new Server();

  await mongooseConnection.start();
  await server.start();
}

app().catch(console.log);
