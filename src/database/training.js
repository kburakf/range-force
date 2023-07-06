module.exports = class TrainingDatabase {
  constructor({ TrainingModel }) {
    this.TrainingModel = TrainingModel;
  }

  async startTraining({ moduleId, userId }) {
    const trainingModel = new this.TrainingModel({ moduleId, userId });
    return (await trainingModel.save()).toObject();
  }
};
