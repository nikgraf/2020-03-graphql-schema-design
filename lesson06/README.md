# Field migration

While it's certainly possible to version a GraphQL Schema, it's common practice to not do so.

That's fine when just adding new queries or fields, but now and then we want to change a type or remove a field. Leveraging multiple deploys and deprecations we can make breaking changes in a GraphQL schema without affecting a single user.

In this lesson we use one field renaming example to walk through such a multi-step process.

```graphql
const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    description: String
    image: String
  }

  type Query {
    product(id: ID!): Product
  }
`;
```

So what to do, in case we ended up in a situation where we have a field like image returning a string, but we want to move to image returning a full Image.

- highlight image: String

```
image: String
# image: Image
```

First, our focus should still be on providing value as soon as possible. Therefor we add imageObject returning our new Image type.

```graphql
type Product {
  id: ID!
  name: String
  description: String
  image: String
  imageObject: Image
}
```

```graphql
type Image {
  url: String
  description: String
  thumbnailUrl(width: Int, height: Int): String
}
```

Deprecate the image field

```graphql
image: String @deprecated(reason: "Use \`imageObject { url }\`.")
```

--> Deploy
--> Wait until no user is using image anymore

- remove `image: String` and add `image: Image`

```graphql
image: Image
imageObject: Image @deprecated(reason: "Use \`image\`.")
```

--> Deploy
--> Wait until no user is using imageObject anymore

- remove the field imageObject

In summary: with enough time and multiple deploys you can make breaking changes in a Graphql schema without affecting a single user
