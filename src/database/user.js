module.exports = class UserDatabase {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async signup({ user }) {
    const userModel = new this.UserModel(user);
    return (await userModel.save()).toObject();
  }

  async getUserByEmail({ email, fields }) {
    return this.UserModel.findOne({ email }).select(fields).lean().exec();
  }

  async getUserById({ userId, fields }) {
    return this.UserModel.findById({ _id: userId })
      .select(fields)
      .lean()
      .exec();
  }

  async updateUserById({ userId, user }) {
    return this.UserModel.findOneAndUpdate(
      { _id: userId },
      {
        ...(user.name ? { name: user.name } : undefined),
        ...(user.surname ? { surname: user.surname } : undefined),
        ...(user.gender ? { gender: user.gender } : undefined),
        ...(user.email ? { email: user.email } : undefined),
        ...(user.password ? { password: user.password } : undefined),
        ...(user.phoneNumber ? { phoneNumber: user.phoneNumber } : undefined),
        ...(user.imageUrl ? { imageUrl: user.imageUrl } : undefined),
      },
    )
      .lean()
      .exec();
  }
};
