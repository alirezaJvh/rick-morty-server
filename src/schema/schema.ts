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

export { typeDefinitions };
