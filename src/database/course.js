module.exports = class CourseDatabase {
  constructor({ CourseModel }) {
    this.CourseModel = CourseModel;
  }

  async create({ course }) {
    const courseModel = new this.CourseModel(course);
    return (await courseModel.save()).toObject();
  }

  async getCourseByName({ name, fields }) {
    return this.CourseModel.findOne({ name }).select(fields).lean().exec();
  }

  async getCourseById({ courseId, fields }) {
    return this.CourseModel.findOne({ _id: courseId })
      .select(fields)
      .lean()
      .exec();
  }

  async updateCourseById({ courseId, course }) {
    return this.CourseModel.findOneAndUpdate(
      { _id: courseId },
      {
        ...(course.name ? { name: course.name } : undefined),
      }
    )
      .lean()
      .exec();
  }

  async deleteCourseById({ courseId }) {
    // We can do soft delete using status filed in course data instead hard delete. It depends on expectation
    return this.CourseModel.findByIdAndDelete({ _id: courseId }).lean().exec();
  }

  async addModuleToCourse({ courseId, moduleId }) {
    return this.CourseModel.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { modules: [moduleId] } }
    )
      .lean()
      .exec();
  }

  async getCourseByNameWithModules({ courseName, fields, moduleFields }) {
    const courseData = this.CourseModel.findOne({ name: courseName }).select(fields);

    courseData.populate({
      path: 'modules',
      select: moduleFields,
    });

    return courseData.lean().exec();
  }
};
