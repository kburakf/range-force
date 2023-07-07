module.exports = class CourseLogic {
  static isModuleExistInCourse({ moduleId, course }) {
    if (course.modules && course.modules.length) {
      return !!course.modules.find((module) => module.toString() === moduleId);
    }

    return false;
  }
};
