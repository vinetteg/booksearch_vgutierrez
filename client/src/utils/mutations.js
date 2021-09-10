import { gql } from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($books: BookInput!) {
    saveBook(books: $BookInput) {
      _id
      email
      username
      createdAt
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      email
      username
      createdAt
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
