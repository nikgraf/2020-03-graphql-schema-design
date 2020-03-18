# Mutation Payload

When it comes to Mutations we as so often can learn from an Relay specification. In particular from the Relay Input Object Mutations Specification

https://relay.dev/docs/en/next/graphql-server-specification#mutations

Always use one Input. This part of the `Relay Input Object Mutations Specification`.

1. Mutations are named as verbs `createProduct`, `introduceShip`, `deleteCollection`.
2. Single argument input
3. The input type name is the capitalized mutation name with a `Input` postfix e.g. `CreateProductInput`, `IntroduceShipInput`.
4. The returned value is a new custom type that can contain various fields.
5. The return type is name is the capitalized mutation name with a `Payload` postfix e.g. `CreateProductPayload`, `IntroduceShipPayload`.

## Why Input?

```
mutation CreateProductMutation($input: CreateProductInput!) {
  createProduct(input: $input) { ... }
}

# vs.

mutation CreateProductMutation($name: String!, $description: String!, ...) {
  createProduct(name: $name, description: $description, ...) { ... }
}
```

## Conclusion

Relay comes with a specification and a set of well define conventions for GraphQL Mutations. By following the conventions, we not only design Mutations in a way that they can be extended with easy, but also reduce a lot of cognitive overhead.
