import { gql } from "@apollo/client";

export const GET_ALL_BLOG_CATEGORY = gql`
  query blogCategoryGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: BlogCategoryFilter!
  ) {
    blogCategoryGetAll(
      paginationQuery: $paginationQuery
      filterQuery: $filterQuery
    ) {
      message
      status
      data {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_BLOG_CATEGORY = gql`
  query blogCategoryGet($id: Int!) {
    blogCategoryGet(id: $id) {
      id
      title
      createdAt
      updatedAt
    }
  }
`;
