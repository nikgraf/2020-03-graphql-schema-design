## Naming Queries

When naming queries there are almost now rules or recommendations. Nevertheless it's recommended to at least have some conventions in order to reduce cognitive overhead for developers.

we want to load by slug e.g.

- example.com/product/abc
- example.com/product/greenbook

Schema:

```graphql
product(id: ID, slug: String): Product
```

Queries:

```graphql
product(id: "abc") { … }
product(slug: "greenbook") { … }
product(id: "cde", slug: "greenbook") { … } id & slug - not desired
product { … } - leaving all out is also not desired
```

Good Alternative

Schema

```graphql
productById(id: ID!): Product
productBySlug(slug: String!): Product
```

or skip the byId everytime

```graphql
product(id: ID!): Product
productBySlug(slug: String!): Product
```
