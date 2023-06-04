import { Mutation, MutationLoginOrCreateUserArgs } from '../types';
import { UserModel } from '../models';
import jwt from 'jsonwebtoken';

const mutation = {
  async loginOrCreateUser(_parent: Mutation, { data }: MutationLoginOrCreateUserArgs) {
    console.log('call login');
    const { username } = data;
    try {
      let user = await UserModel.findOne({ username });
      if (!user) {
        user = new UserModel({ username });
        await user.save();
      }
      const token = createToken(user.id, username);
      return { token, user };
    } catch (e) {
      console.log(e);
    }
  },
};

const createToken = (id: string, username: string) => {
  return jwt.sign(
    {
      id: id,
      username: username,
    },
    'kYK2FZr$B8ytGy^G5T@+',
  );
};

export { mutation };
