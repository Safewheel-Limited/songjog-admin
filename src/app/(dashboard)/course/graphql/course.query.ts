import { gql } from "@apollo/client";

export const GET_ALL_COURSE = gql`
  query courseGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: CourseFilter!
  ) {
    courseGetAll(paginationQuery: $paginationQuery, filterQuery: $filterQuery) {
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
        price
        course_time
        author {
          fullName
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_COURSE = gql`
  query courseGet($id: Int!) {
    courseGet(id: $id) {
      id
      title
      description
      about_course
      price
      course_time
      thumbnails {
        id
        fileUrl
      }
      levelId
      lesson {
        id
      }
      author {
        id
      }
    }
  }
`;
