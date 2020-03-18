const { gql } = require("apollo-server");

const typeDefs = gql`
  type Image {
    url: String
    description: String
    thumbnailUrl(width: Int, height: Int): String
  }

  type PaginationEntry {
    cursor: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    hasNextPages(amount: Int!, first: Int): [PaginationEntry!]!
    hasPreviousPages(amount: Int!, first: Int): [PaginationEntry!]!
    startCursor: ID!
    endCursor: ID!
  }

  type RecommendedProductEdge {
    node: Product!
    cursor: ID!
    boughtTogetherPercentage: Int
  }

  type RecommendedProductConnection {
    edges: [RecommendedProductEdge]
    pageInfo: PageInfo!
  }

  interface Node {
    id: ID!
  }

  type Product implements Node {
    id: ID!
    name: String
    description(format: String, locale: String): String
    imageUrl: String @deprecated(reason: "Use \`image { url }\`.")
    image: Image
    recommendedProducts(first: Int!, after: ID): RecommendedProductConnection!
  }

  type Query {
    product(id: ID!): Product
    productBySlug(slug: String!): Product
    node(id: ID!): Node
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
