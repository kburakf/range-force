const mongoose = require('mongoose');

const { Schema } = mongoose;

const { DIFFICULTIES } = require('../constants');

const ModuleSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, unique: true },
    difficulty: { type: String, enum: Object.values(DIFFICULTIES) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

ModuleSchema.pre('findOneAndUpdate', async function (next) {
  const module = this.getUpdate();

  module.updatedAt = new Date();

  next();
});

const ModuleModel = () => mongoose.model('Module', ModuleSchema);

module.exports = ModuleModel;
