const { gql } = require("apollo-server");

const typeDefs = gql`
  type Image {
    sourceUrl: String
    description: String
    thumbnailUrlUrl(width: Int, height: Int): String
  }

  type Price {
    value: String
    currency: String
  }

  type Product {
    id: ID!
    name: String
    description(locale: String): String
    imageUrl: String @deprecated(reason: "Use \`image { sourceUrl }\`.")
    image: Image
    price(currency: String): Price
  }

  type Query {
    product(id: ID!): Product
  }
`;

const resolvers = {};

const mocks = {
  Price: () => ({
    value: "33,21",
    currency: "EUR"
  })
};

module.exports = {
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false
};
