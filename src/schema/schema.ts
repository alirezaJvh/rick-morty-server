const typeDefinitions = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    loginOrCreateUser(data: loginOrCreateUserInput!): AuthPayload!
  }

  input loginOrCreateUserInput {
    username: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

export { typeDefinitions };
