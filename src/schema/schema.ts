const typeDefinitions = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
  }

  type Query {
    hello: String
    characters(page: Int, filter: FilterCharacter): Characters
  }

  input FilterCharacter {
    name: String
    status: String
    species: String
    type: String
    gender: String
  }

  type Characters {
    info: Info
    results: [Character]
  }

  type Character {
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Location
    location: Location
    image: String
    episode: [Episode]!
    created: String
  }

  type Location {
    id: ID
    name: String
    type: String
    dimension: String
    residents: [Character]!
    created: String
  }

  type Episode {
    id: ID
    name: String
    air_date: String
    episode: String
    characters: [Character]!
    created: String
  }

  type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
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
