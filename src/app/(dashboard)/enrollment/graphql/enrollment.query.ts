import { gql } from "@apollo/client";

export const GET_ALL_ENROLLMENT = gql`
  query enrollmentGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: EnrollmentFilter!
  ) {
    enrollmentGetAll(
      paginationQuery: $paginationQuery
      filterQuery: $filterQuery
    ) {
      message
      status
      data {
        id
        user {
          fullName
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ENROLLMENT = gql`
  query enrollmentGet($id: Int!) {
    enrollmentGet(id: $id) {
      id
      courseId
      userId
    }
  }
`;
