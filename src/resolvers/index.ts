import { User } from '../schema/types';
const user: User = {
  username: 'ali',
};
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
  Mutation: {
    createUser: (_: any, args: User) => {
      user.username = args.username;
      return user;
    },
  },
};

export { resolvers };
