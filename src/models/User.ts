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

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
