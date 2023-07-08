module.exports = class CourseController {
  constructor({ CourseService }) {
    this.CourseService = CourseService;
  }

  async create(request) {
    const { CourseService } = this;
    const course = request.body;
    return CourseService.create({ course });
  }

  async update(request) {
    const { CourseService } = this;
    const { courseId } = request.params;
    const course = request.body;
    return CourseService.update({ course, courseId });
  }

  async delete(request) {
    const { CourseService } = this;
    const { courseId } = request.params;
    return CourseService.delete({ courseId });
  }

  async addModuleToCourse(request) {
    const { CourseService } = this;
    const { courseId, moduleId } = request.params;
    return CourseService.addModuleToCourse({ courseId, moduleId });
  }

  async listModulesByCourseName(request) {
    const { CourseService } = this;
    const { name: courseName } = request.query;
    return CourseService.listModulesByCourseName({ courseName });
  }
};
