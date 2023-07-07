const {
  CourseExistError,
  CourseNotFoundError,
  ModuleNotFoundError,
  ModuleExistInCourseError,
} = require('../errors/types');
const { CourseLogic } = require('../logic');

module.exports = class CourseService {
  constructor({ logger, CourseDatabase, ModuleDatabase }) {
    this.logger = logger;
    this.CourseDatabase = CourseDatabase;
    this.ModuleDatabase = ModuleDatabase;
  }

  async create({ course }) {
    const { logger, CourseDatabase } = this;

    logger.debug('[CourseService] create', { course });

    const courseData = await CourseDatabase.getCourseByName({
      name: course.name,
      fields: '_id',
    });

    if (courseData) {
      throw new CourseExistError();
    }

    const createdCourse = await CourseDatabase.create({ course });

    return createdCourse;
  }

  async update({ course, courseId }) {
    const { logger, CourseDatabase } = this;

    logger.debug('[CourseService] update', { course, courseId });

    const courseData = await CourseDatabase.getCourseById({
      courseId,
      fields: '_id',
    });

    if (!courseData) {
      throw new CourseNotFoundError();
    }

    const updatedCourse = await CourseDatabase.updateCourseById({
      course,
      courseId,
    });

    return updatedCourse;
  }

  async delete({ courseId }) {
    const { logger, CourseDatabase } = this;

    logger.debug('[CourseService] delete', { courseId });

    const courseData = await CourseDatabase.getCourseById({
      courseId,
      fields: '_id',
    });

    if (!courseData) {
      throw new CourseNotFoundError();
    }

    await CourseDatabase.deleteCourseById({ courseId });

    return { isSuccess: true };
  }

  async addModuleToCourse({ courseId, moduleId }) {
    const { logger, CourseDatabase, ModuleDatabase } = this;

    logger.debug('[CourseService] addModuleToCourse', { courseId, moduleId });

    const courseData = await CourseDatabase.getCourseById({
      courseId,
      fields: '_id modules',
    });

    if (!courseData) {
      throw new CourseNotFoundError();
    }

    const moduleData = await ModuleDatabase.getModuleById({
      moduleId,
      fields: '_id',
    });

    if (!moduleData) {
      throw new ModuleNotFoundError();
    }

    const isModuleExist = CourseLogic.isModuleExistInCourse({
      moduleId,
      course: courseData,
    });

    if (isModuleExist) {
      throw new ModuleExistInCourseError();
    }

    const updatedCourse = await CourseDatabase.addModuleToCourse({
      courseId,
      moduleId,
    });

    return updatedCourse;
  }

  async listModulesByCategoryName({ courseName }) {
    const { logger, CourseDatabase } = this;

    logger.debug('[CourseService] listModulesByCategoryName', { courseName });

    const courseData = await CourseDatabase.getCourseByNameWithModules({
      courseName,
      fields: '-_id name modules',
      moduleFields: '-_id name description difficulty',
    });

    if (!courseData) {
      throw new CourseNotFoundError();
    }

    return courseData;
  }
};
