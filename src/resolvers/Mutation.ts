import {
  Mutation,
  MutationLoginOrCreateUserArgs,
  MutationAddFavouriteArgs,
  MutationRemoveFavouriteArgs,
} from '../types';
import { UserModel } from '../models';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

const mutation = {
  async loginOrCreateUser(_parent: Mutation, { data }: MutationLoginOrCreateUserArgs) {
    const { username } = data;
    try {
      let user = await UserModel.findOne({ username });
      if (!user) {
        user = new UserModel({ username, favourites: [] });
        await user.save();
      }
      const token = createToken(user.id, username);
      return { token, user };
    } catch (e) {
      console.log(e);
    }
  },

  async addFavourite(_parent: Mutation, { data }: MutationAddFavouriteArgs, { currentUser }: any) {
    try {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const { id } = currentUser;
      const user = await UserModel.findById(id);
      if (!user) {
        throw new GraphQLError(`User with id ${id} not found. `, {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        });
      }
      const favourites = user.favourites.concat(data);
      user.favourites = favourites;
      await user.save();
      return user;
    } catch (e) {
      console.log(e);
    }
  },

  async removeFavourite(
    _parent: Mutation,
    { data }: MutationRemoveFavouriteArgs,
    { currentUser }: any,
  ) {
    try {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const { id } = currentUser;
      const user = await UserModel.findById(id);
      if (!user) {
        throw new GraphQLError(`User with id ${id} not found. `, {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        });
      }
      const favourites = user.favourites.filter((f) => f.id !== data.id);
      user.favourites = favourites;
      await user.save();
      return user;
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
