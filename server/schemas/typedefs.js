const { gql } = require("apollo-server-express");

const typedefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    saveBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    bookId: String
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(books: BookInput!): Auth
    removeBook(bookId: ID!): User
  }
`;

module.exports = typedefs;
