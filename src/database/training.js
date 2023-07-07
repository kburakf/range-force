module.exports = class TrainingDatabase {
  constructor({ TrainingModel }) {
    this.TrainingModel = TrainingModel;
  }

  async getTraining({ moduleId, userId, fields }) {
    return this.TrainingModel.findOne({ moduleId, userId })
      .select(fields)
      .lean()
      .exec();
  }

  async startTraining({ moduleId, userId }) {
    const trainingModel = new this.TrainingModel({ moduleId, userId });
    return (await trainingModel.save()).toObject();
  }
};
