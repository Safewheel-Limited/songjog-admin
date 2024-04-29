import { gql } from "@apollo/client";

export const GET_ALL_REVIEW = gql`
  query reviewGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: ReviewFilter!
  ) {
    reviewGetAll(paginationQuery: $paginationQuery, filterQuery: $filterQuery) {
      message
      status
      pagination {
        page
        limit
        total
        totalPages
      }

      data {
        id
        courseId
        rating
        comment
        course {
          title
        }
        user {
          id
          fullName
        }
      }
    }
  }
`;

export const GET_REVIEW = gql`
  query reviewGet($id: Int!) {
    reviewGet(id: $id) {
      id
      user {
        id
        fullName
      }
      courseId
      comment
      rating
    }
  }
`;
