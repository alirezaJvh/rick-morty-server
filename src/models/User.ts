import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } },
);

const UserModel = mongoose.model('user', userSchema);

export { UserModel };
