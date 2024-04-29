import { gql } from "@apollo/client";

export const GET_ALL_LEVEL = gql`
  query levelGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: LevelFilter!
  ) {
    levelGetAll(paginationQuery: $paginationQuery, filterQuery: $filterQuery) {
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
        levelTitle
        galleryId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_LEVEL = gql`
  query levelGet($id: Int!) {
    levelGet(id: $id) {
      id
      levelTitle
      galleryId
      createdAt
      updatedAt
    }
  }
`;
