## Nullability for Lists

Most of the times you want the item to be present.

```graphql
fieldName: [String]     # can be null | ["abc", "cde"] | ["abc", null, "cde"] | [] | [null]
fieldName: [String!]    # can be null | ["abc", "cde"] | []
fieldName: [String]!    # can be ["abc", "cde"] | ["abc", null, "cde"] | [] | [null]
fieldName: [String!]!   # can be ["abc", "cde"] | []
```

This make a lot of sense (most of the time!)

```graphql
fieldName: [String!]
```

NOTE this doesn't mean there has to be one item in it.

But yeah, sometimes gaps in a list might be desired e.g.

```
products(ids: [ID!]!): [Product]!
```
