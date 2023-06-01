import { createSchema } from 'graphql-yoga';
import { resolvers } from '../resolvers';
import { typeDefinitions } from './schema';

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
