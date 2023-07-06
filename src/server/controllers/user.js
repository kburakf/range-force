module.exports = class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async signup(request) {
    const { UserService } = this;
    const user = request.body;
    return UserService.signup({ user });
  }

  async login(request) {
    const { UserService } = this;
    const { email, password } = request.body;
    return UserService.login({ email, password });
  }

  async updateUserDetail(request) {
    const { UserService } = this;
    const { userId } = request.params;
    const user = request.body;
    return UserService.updateUserDetail({ userId, user });
  }
};
