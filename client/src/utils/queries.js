import { gql } from "apollo/client";

export const GET_ME = gql`
  query me {
    me {
      __id
      username
      email
      bookCount
      savedBooks
      savedBooks {
        _id
        thoughtText
        thoughtAuthor
        createAt
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
