/* eslint-disable no-shadow */
const awilix = require('awilix');
const axios = require('axios');
const logger = require('loglevel');

const container = awilix.createContainer();
const RedisCache = require('../utils/redis-cache');

const createRouteHandlerFunction = (container, { controllerName, methodName }) => async (req, res) => {
  const scoped = container.createScope();
  const controller = scoped.resolve(controllerName);
  const routeHandler = controller[methodName].bind(controller);
  return routeHandler(req, res);
};

const createRouteModifier = (container) => (route) => {
  const [controllerName, methodName] = route.handler.split('.');
  return {
    ...route,
    handler: createRouteHandlerFunction(container, { controllerName, methodName }),
  };
};

function routes() {
  container.loadModules(['../server/controllers/*.js'], { cwd: __dirname });
  const modifyRoute = createRouteModifier(container);
  return awilix
    .listModules(['../server/routes/*.js'], { cwd: __dirname })
    .map(({ path }) => path)
    .map(require)
    .reduce((acc, rawRoutes) => acc.concat(rawRoutes.map(modifyRoute)), []);
}

function setup() {
  container.register('RedisCache', awilix.asClass(RedisCache));
  container.register('axios', awilix.asValue(axios));
  container.register('logger', awilix.asValue(logger));

  awilix
    .listModules(['../server/controllers/*.js'], { cwd: __dirname })
    .map(({ path }) => path)
    .map(require)
    .map((controller) => container.register(`${controller.name}`, awilix.asClass(controller)));

  awilix
    .listModules(['../services/*.js'], { cwd: __dirname })
    .map(({ path }) => path)
    .map(require)
    .map((service) => container.register(`${service.name}`, awilix.asClass(service)));

  awilix
    .listModules(['../database/*.js'], {
      cwd: __dirname, resolverOptions: { lifetime: awilix.Lifetime.SINGLETON },
    })
    .map(({ path }) => path)
    .map(require)
    .map((database) => container.register(`${database.name}`, awilix.asClass(database)));

  awilix
    .listModules(['../models/*.js'], { cwd: __dirname })
    .map(({ path }) => path)
    .map(require)
    .map((model) => container.register(`${model.name}`, awilix.asFunction(model)));
}

module.exports = { setup, routes };
