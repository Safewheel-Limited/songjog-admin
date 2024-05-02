import { gql } from "@apollo/client";

export const GET_ALL_LESSON_ITEMS = gql`
  query lessonItemGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: LessonItemFilter!
  ) {
    lessonItemGetAll(
      paginationQuery: $paginationQuery
      filterQuery: $filterQuery
    ) {
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
        title
        description
        time
        createdAt
        lesson {
          lesson_title
        }
        file {
          id
          fileUrl
        }
      }
    }
  }
`;

export const GET_LESSON_ITEM = gql`
  query lessonItemGet($id: Int!) {
    lessonItemGet(id: $id) {
      id
      lessonId
      title
      file {
        id
        fileUrl
      }
      description
      time
    }
  }
`;
