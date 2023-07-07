module.exports = class ModuleController {
  constructor({ ModuleService }) {
    this.ModuleService = ModuleService;
  }

  async create(request) {
    const { ModuleService } = this;
    const module = request.body;
    return ModuleService.create({ module });
  }

  async update(request) {
    const { ModuleService } = this;
    const { moduleId } = request.params;
    const module = request.body;
    return ModuleService.update({ module, moduleId });
  }

  async delete(request) {
    const { ModuleService } = this;
    const { moduleId } = request.params;
    return ModuleService.delete({ moduleId });
  }

  async startTraining(request) {
    const { ModuleService } = this;
    const { moduleId, id: userId } = request.params;
    return ModuleService.startTraining({ moduleId, userId });
  }

  async top10Modules() {
    const { ModuleService } = this;
    return ModuleService.top10Modules();
  }
};
