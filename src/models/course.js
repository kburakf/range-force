const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    name: { type: String, unique: true },
    modules: [{ type: mongoose.Types.ObjectId, ref: 'Module' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

CourseSchema.pre('findOneAndUpdate', async function (next) {
  const course = this.getUpdate();

  course.updatedAt = new Date();

  next();
});

const CourseModel = () => mongoose.model('Course', CourseSchema);

module.exports = CourseModel;
