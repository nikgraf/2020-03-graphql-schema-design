# Connections incl. Cursors

## Presentation

https://graphql.org/learn/pagination/

```graphql
# step 1
recommendedProducts(limit: Int, after: ID, last: Int, before: ID): RecommendedProductConnection

# step 2
type RecommendedProductConnection {
  edges: [RecommendedProduct]
}

# step 3
type RecommendedProduct {
  node: Product!
  boughtTogetherPercentage: Float
}

# step 4
type RecommendedProductConnection {
  edges: [RecommendedProductEdge]
}

type RecommendedProductEdge

# step 5
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: ID!
  endCursor: ID!
}

type RecommendedProductConnection {
  edges: [RecommendedProductEdge]
  pageInfo: PageInfo!
}
```

Final:

```graphql
{
  product(id: "abc") {
    id
    name
    description
    image {
      url
      description
    }
    recommendedProducts(first: 10) {
      edges {
        node {
          name
          description
          image {
            url
            description
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```

## Exercise

Add the field `reviews` to the product.
A review includes a mandatory star voting (1-5), an optional text and a mandatory connection to one user.
Further it should be possible to retrieve if the reviewer actually purchased the product.

**Hint**: The User type can simply include ID and username.
