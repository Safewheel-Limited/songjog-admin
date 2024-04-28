import { gql } from "@apollo/client";

export const GET_ALL_LESSON = gql`
  query lessonGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: LessonFilter!
  ) {
    lessonGetAll(paginationQuery: $paginationQuery, filterQuery: $filterQuery) {
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
        lesson_time
        lesson_title
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_LESSON = gql`
  query lessonGet($id: Int!) {
    lessonGet(id: $id) {
      id
      lesson_time
      lesson_title
      createdAt
      updatedAt
    }
  }
`;
