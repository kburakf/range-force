const { ModuleExistError, ModuleNotFoundError } = require('../errors/types');

module.exports = class ModuleService {
  constructor({ logger, ModuleDatabase, TrainingDatabase, RedisCache }) {
    this.logger = logger;
    this.ModuleDatabase = ModuleDatabase;
    this.TrainingDatabase = TrainingDatabase;
    this.RedisCache = RedisCache;
  }

  async create({ module }) {
    const { logger, ModuleDatabase } = this;

    logger.debug('[ModuleService] create', { module });

    const moduleData = await ModuleDatabase.getModuleByModuleData({
      name: module.name,
      description: module.description,
      difficulty: module.difficulty,
      fields: '_id',
    });

    if (moduleData) {
      throw new ModuleExistError();
    }

    await ModuleDatabase.create({ module }).catch((err) => {
      throw new Error(err);
    });

    return { isSuccess: true };
  }

  async update({ module, moduleId }) {
    const { logger, ModuleDatabase } = this;

    logger.debug('[ModuleService] update', { module, moduleId });

    const moduleData = await ModuleDatabase.getModuleById({
      moduleId,
      fields: '_id',
    });

    if (!moduleData) {
      throw new ModuleNotFoundError();
    }

    await ModuleDatabase.updateModuleById({ module, moduleId }).catch((err) => {
      throw new Error(err);
    });

    return { isSuccess: true };
  }

  async delete({ moduleId }) {
    const { logger, ModuleDatabase } = this;

    logger.debug('[ModuleService] delete', { moduleId });

    const moduleData = await ModuleDatabase.getModuleById({
      moduleId,
      fields: '_id',
    });

    if (!moduleData) {
      throw new ModuleNotFoundError();
    }

    await ModuleDatabase.deleteModuleById({ moduleId });

    return { isSuccess: true };
  }

  async startTraining({ moduleId, userId }) {
    const { logger, ModuleDatabase, TrainingDatabase, RedisCache } = this;

    logger.debug('[ModuleService] start', { moduleId, userId });

    const moduleData = await ModuleDatabase.getModuleById({
      moduleId,
      fields: '_id',
    });

    if (!moduleData) {
      throw new ModuleNotFoundError();
    }

    const training = await TrainingDatabase.getTraining({ moduleId, userId, fields: '_id' });
    // I am not sure if we need to create duplicate training here?
    if (!training) {
      await TrainingDatabase.startTraining({ moduleId, userId });
    }

    await RedisCache.increaseModuleCount({ moduleId });

    return { isSuccess: true };
  }

  async top10Modules() {
    const { RedisCache } = this;
    return RedisCache.getTop10Modules();
  }
};
