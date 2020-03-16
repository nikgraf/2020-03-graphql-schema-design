const { gql } = require("apollo-server");

const typeDefs = gql`
  type Image {
    url: String
    description: String
    thumbnailUrl(width: Int, height: Int): String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: ID!
    endCursor: ID!
  }

  type RecommendedProductEdge {
    node: Product!
    cursor: ID!
  }

  type RecommendedProductConnection {
    edges: [RecommendedProductEdge]
    pageInfo: PageInfo!
  }

  type User {
    id: ID!
    username: String
  }

  type Review {
    user: User!
    stars: Int
    text: String
  }

  type ReviewEdge {
    node: Review!
    cursor: ID!
    hasBoughtProduct: Boolean
  }

  type ReviewConnection {
    edges: [ReviewEdge]
    pageInfo: PageInfo!
  }

  type Product {
    id: ID!
    name: String
    description(format: String, locale: String): String
    imageUrl: String @deprecated(reason: "Use \`image { url }\`.")
    image: Image
    recommendedProducts(first: Int!, after: ID): RecommendedProductConnection!
    reviews(first: Int!, after: ID): ReviewConnection!
  }

  type Query {
    product(id: ID!): Product
  }
`;

const resolvers = {};

const mocks = {};

module.exports = {
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false
};
