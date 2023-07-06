const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrainingSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    moduleId: { type: mongoose.Types.ObjectId, ref: 'Module' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

TrainingSchema.pre('findOneAndUpdate', async function (next) {
  const user = this.getUpdate();

  user.updatedAt = new Date();

  next();
});

const TrainingModel = () => mongoose.model('Training', TrainingSchema);

module.exports = TrainingModel;
