# Extending GraphQL Connections with additional Fields and Arguments

## Presentation

## Improved Query

```graphql
hasNextPages(amount: 3) {
  cursor
}
```

For previous pages we can do the same.

```graphql
hasPreviousPages(amount: 3) {
  cursor
}
```

Implementation

```graphql
type PaginationEntry {
  cursor: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: ID!
  endCursor: ID!
}

type RecommendedProductConnectionPageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  hasNextPages(amount: Int!): [PaginationEntry!]!
  hasPreviousPages(amount: Int!): [PaginationEntry!]!
  startCursor: ID!
  endCursor: ID!
}
```

Let's verify if it works as expected.

```graphql
{
  product(id: "abc") {
    recommendedProducts(first: 10) {
      edges {
        node {
          name
          image {
            url
          }
        }
        boughtTogetherPercentage
      }
      pageInfo {
        hasNextPages(amount: 3) {
          cursor
        }
        hasPreviousPages(amount: 3) {
          cursor
        }
        startCursor
        endCursor
      }
    }
  }
}
```

Looks good. We receive a list of 3 cursors for each of the fields.
