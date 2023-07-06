const { ExampleNotFound } = require('../errors/types');

module.exports = class ExampleService {
  constructor({ logger, ExampleDatabase }) {
    this.logger = logger;
    this.ExampleDatabase = ExampleDatabase;
  }

  async getExampleById({ exampleId }) {
    const { logger, ExampleDatabase } = this;
    logger.error('[ExampleService] getExampleById', { exampleId });
    const example = await ExampleDatabase.getExampleById({ exampleId });

    if (!example) {
      throw new ExampleNotFound();
    }

    return example;
  }

  async createExample({ example }) {
    const { logger, ExampleDatabase } = this;
    logger.debug('[ExampleService] createExample', { example });
    return ExampleDatabase.createExample({ example });
  }

  async updateExample({ exampleId, data }) {
    const { logger, ExampleDatabase } = this;
    logger.debug('[ExampleService] updateExample', { exampleId, data });
    return ExampleDatabase.updateExample({ exampleId, data });
  }

  async deleteExample({ exampleId }) {
    const { logger, ExampleDatabase } = this;
    logger.debug('[ExampleService] deleteExample', { exampleId });
    return ExampleDatabase.deleteExample({ exampleId });
  }
};
