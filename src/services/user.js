const { AuthLogic, CommonLogic } = require('../logic');
const {
  EmailInUseError,
  UserNotFoundError,
  WrongPassword,
  SamePasswordError,
  SameEmailError,
} = require('../errors/types');

module.exports = class UserService {
  constructor({ logger, UserDatabase }) {
    this.logger = logger;
    this.UserDatabase = UserDatabase;
  }

  async signup({ user }) {
    const { logger, UserDatabase } = this;

    logger.debug('[UserService] signup', { user });

    const userData = await UserDatabase.getUserByEmail({ email: user.email });

    if (userData) {
      throw new EmailInUseError();
    }

    await UserDatabase.signup({ user });

    return { isSuccess: true };
  }

  async login({ email, password }) {
    const { logger, UserDatabase } = this;

    logger.debug('[UserService] loginUser', { email, password });

    const user = await UserDatabase.getUserByEmail({
      email,
      fields: '_id password status',
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordCorrect = await AuthLogic.comparePassword({
      password,
      hash: user.password,
    });

    if (!isPasswordCorrect) {
      throw new WrongPassword();
    }

    return {
      isSuccess: true,
      token: AuthLogic.generateToken({ id: user._id }),
    };
  }

  async updateUserDetail({ userId, user }) {
    const { UserDatabase } = this;

    const userData = await UserDatabase.getUserById({ userId });

    if (!userData) {
      throw new UserNotFoundError();
    }

    if (user.password) {
      const isPasswordSame = await AuthLogic.comparePassword({
        password: user.password,
        hash: userData.password,
      });

      if (isPasswordSame) {
        throw new SamePasswordError();
      }
    }

    if (
      user.email &&
      CommonLogic.isEmailSame({
        newEmail: user.email,
        oldEmail: userData.email,
      })
    ) {
      throw new SameEmailError();
    }

    await UserDatabase.updateUserById({ userId, user });

    return { isSuccess: true };
  }
};
