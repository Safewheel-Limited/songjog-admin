import { gql } from "@apollo/client";

export const GET_ALL_BLOG = gql`
  query blogGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: BlogFilter!
  ) {
    blogGetAll(paginationQuery: $paginationQuery, filterQuery: $filterQuery) {
      message
      status
      data {
        id
        title
        details
        readTime
        isActive
        blogCategory {
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_BLOG = gql`
  query blogGet($id: Int!) {
    blogGet(id: $id) {
      id
      title
      details
      readTime
      isActive
      thumbnails {
        id
        fileUrl
      }
      blogCategoryId
    }
  }
`;
