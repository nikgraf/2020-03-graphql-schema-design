# Nullable Fields

## Presentation

Inspiration: https://graphql.org/learn/best-practices/#nullability

Benefits of Nullability

- error propagation e.g. thumbnail not loading, can be null and source can be used
- ACL not every user should see the email of other users. Only the current user can.
- when deprecating fields we can return null instead of maintaing it or causing a breaking change

## Exercise

Revisit your price field design from the previous lesson and see if you would change anything.
