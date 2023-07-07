const { CommonLogic } = require('../../logic');

describe('CommonLogic', () => {
  describe('isEmailSame', () => {
    test('should return true when new email is same as old email', () => {
      const newEmail = 'rangeforce@example.com';
      const oldEmail = 'rangeforce@example.com';

      const result = CommonLogic.isEmailSame({ newEmail, oldEmail });

      expect(result).toBe(true);
    });

    test('should return false when new email is different from old email', () => {
      const newEmail = 'rangeforce@example.com';
      const oldEmail = 'other@example.com';

      const result = CommonLogic.isEmailSame({ newEmail, oldEmail });

      expect(result).toBe(false);
    });
  });
});
