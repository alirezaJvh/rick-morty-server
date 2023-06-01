import { makeExecutableSchema } from '@graphql-tools/schema';

type User = {
  username: string;
};

const user: User = { username: 'alice' };

const typeDefinitions = /* GraphQL */ `
  type User {
    username: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    createUser(username: String!): User!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
  Mutation: {
    createUser: () => user,
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
