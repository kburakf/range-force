const { CourseLogic } = require('../../logic');

describe('CourseLogic', () => {
  describe('isModuleExistInCourse', () => {
    test('should return true if module exists in the course modules', () => {
      const moduleId = 'module-123';
      const course = {
        modules: ['module-456', 'module-123', 'module-789'],
      };

      const result = CourseLogic.isModuleExistInCourse({ moduleId, course });

      expect(result).toBe(true);
    });

    test('should return false if module does not exist in the course modules', () => {
      const moduleId = 'module-123';
      const course = {
        modules: ['module-456', 'module-789'],
      };

      const result = CourseLogic.isModuleExistInCourse({ moduleId, course });

      expect(result).toBe(false);
    });

    test('should return false if course has no modules', () => {
      const moduleId = 'module-123';
      const course = {};

      const result = CourseLogic.isModuleExistInCourse({ moduleId, course });

      expect(result).toBe(false);
    });
  });
});
