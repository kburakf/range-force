const mongoose = require('mongoose');

const { Schema } = mongoose;
const { AuthLogic } = require('../logic');
const { ACCOUNT_STATUSES, ROLES } = require('../constants');

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    role: { type: String, enum: Object.values(ROLES) },
    password: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(ACCOUNT_STATUSES),
      default: ACCOUNT_STATUSES.ACTIVE,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

UserSchema.pre('save', async function (next) {
  const user = this;

  user.password = await AuthLogic.hashPassword({ password: user.password });

  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const user = this.getUpdate();

  user.updatedAt = new Date();

  if (user.password) {
    user.password = await AuthLogic.hashPassword({ password: user.password });
  }

  next();
});

const UserModel = () => mongoose.model('User', UserSchema);

module.exports = UserModel;
