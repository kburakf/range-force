module.exports = class ModuleDatabase {
  constructor({ ModuleModel }) {
    this.ModuleModel = ModuleModel;
  }

  async create({ module }) {
    const moduleModel = new this.ModuleModel(module);
    return (await moduleModel.save()).toObject();
  }

  async getModuleByModuleData({ name, description, difficulty, fields }) {
    return this.ModuleModel.findOne({ name, description, difficulty })
      .select(fields)
      .lean()
      .exec();
  }

  async getModuleById({ moduleId, fields }) {
    return this.ModuleModel.findOne({ _id: moduleId })
      .select(fields)
      .lean()
      .exec();
  }

  async updateModuleById({ moduleId, module }) {
    return this.ModuleModel.findOneAndUpdate(
      { _id: moduleId },
      {
        ...(module.name ? { name: module.name } : undefined),
        ...(module.description
          ? { description: module.description }
          : undefined),
        ...(module.difficulty ? { difficulty: module.difficulty } : undefined),
      }
    )
      .lean()
      .exec();
  }

  async deleteModuleById({ moduleId }) {
    // We can do soft delete using status filed in module data instead hard delete. It depends on expectation
    return this.ModuleModel.findByIdAndDelete({ _id: moduleId }).lean().exec();
  }
};
