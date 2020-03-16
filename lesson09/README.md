# Extending GraphQL Connections with additional Fields and Arguments

- make sure you have the example query in the browser for the last part of the section
- make sure you have an example query and a full example result

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
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```

While in the Connection spec arguments, how they should be implemented as well as the field structure is well defined,it doesn't prevent us from extending it with fields useful to our context.

- open the connection page and show how arguments and structure is defined

In fact we already did exactly that, by adding the field `boughtTogetherPercentage`.

- switch back to the example query and highlight boughtTogetherPercentage

While probably obvious to you by now, we also can extend PageInfo. Let's do this.

So far, we only can retrieve the information if there is a next or previous page. This works well for endless scrolling UIs. In case we want to have pagination this wouldn't be sufficient since such a UI would allow the user to directly visit the multiple pages ahead of the current one. Currently we only know the startCursor for the next page.

- show the pagingation screenshot (extract if from the slides into a PDF)

In order to retrieve the necessary information in one query we can add a new field: hasThreeNextPages and ask for the cursor.

```graphql
hasThreeNextPages {
  cursor
}
```

Why so? Let me demonstrate by adding it to our examples response. hasThreeNextPages would return an array of 3 items. Each of them would return a cursor ID so we can use it for our after argument when requesting more entries of the connection.

```json
{
  "hasNextPages": [
    { "cursor": "ert" },
    { "cursor": "tyu" },
    { "cursor": "ewq" }
  ],
  "hasPreviousPages": [
    { "cursor": "bvc" },
    { "cursor": "mnb" },
    { "cursor": "lkj" }
  ]
}
```

Be aware that in case there are only two pages, the returned result would only return two entries and our user interface can reflect that.

- remove the last result from the array

Sometimes a bit more flexibility is required though to serve multiple clients. If so we could pass in an argument amount instead of hardcoding the expected amount of next pages. If then want ask for 5 more pages we could do so changing the amount.

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

Let's briefly go through how this would look like in our type definitions. We add a type PaginationEntry containing a cursor.

Then we extend Page info with hasNextPages. It accepts the argument amount and returns a list of PaginationEntries.

```graphql
type PaginationEntry {
  cursor: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  hasNextPages(amount: Int!): [PaginationEntry!]!
  hasPreviousPages(amount: Int!): [PaginationEntry!]!
  startCursor: ID!
  endCursor: ID!
}
```

While you don't have to, I would recommend to still provide and implement the PageInfo fields specified in the connection spec. Clients like Relay will expect them to be there and in case you provide them it allows you to be flexibile with your choice of clients in the future.

One note about the type name. In case you only want to use hasNextPages for recommended product. It's best to have a separate type RecommendedProductPageInfo including all fields and an addition to that you can have PageInfo for other connections.

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

So far so good.

There is one more addition I want to point out. By now we extended the connection spec only with fields, but nothing is preventing us from adding arguments to the connection itself. Common examples are filter or order arguments.

For example we could add the field orderBy, allowing us to order the result by created_at or name.

```graphql
recommendedProducts(
  first: Int
  after: ID
  last: Int
  before: ID
  orderBy: RecommendedProductConnectionOrder
): RecommendedProductConnection!

# NOTE add it on top of it
enum RecommendedProductConnectionOrder {
  CREATED_AT
  NAME
}
```

While obvious in hindsight, for quite a while I thought of the connection specification as something very static and inflexible. I thought extending is was not intended and would be harmful, but the contrary is the case.
And in fact it even says so in the specification multiple times: // May contain other fields.

- go to https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo.Introspection
- highlight // May contain other fields.
