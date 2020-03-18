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

  input CreateProductImageInput {
    url: String!
    description: String!
  }

  input CreateProductInput {
    name: String!
    description: String
    image: CreateProductImageInput
  }

  type Error {
    message: String
    code: Int
    fieldPath: [String!]
  }

  type CreateProductPayload {
    product: Product
    errors: [Error!]
  }

  type Mutation {
    # createProduct(name: String!, description: String!): Product
    # createProduct(description: String!, name: String!): Product
    createProduct(input: CreateProductInput!): CreateProductPayload!
  }
`;

const resolvers = {
  // Mutation: {
  //   createProduct: () => { throw new Error("Failed") }
  // }
};

const mocks = {};

module.exports = {
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false
};
