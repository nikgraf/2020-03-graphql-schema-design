const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    description: String
    image: String
    price: String # Int
  }

  type Query {
    product(id: ID!): Product
  }
`;

const resolvers = {};

const mocks = {
  // Product: () => ({
  //   price: "1299.00"
  // })
};

module.exports = {
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false
};
