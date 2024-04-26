import { gql } from "@apollo/client";

export const GET_ALL_CARE_PACKAGES = gql`
  query carePackageGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: CarePackageFilter!
  ) {
    carePackageGetAll(
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
        level
        price
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CARE_PACKAGE = gql`
  query carePackageGet($id: Float!) {
    carePackageGet(id: $id) {
      id
      title
      description
      thumbnails {
        id
        name
        fileUrl
      }
      level
      price
      basis
      carePackageTime {
        id
        title
      }
    }
  }
`;
