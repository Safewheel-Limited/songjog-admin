import { gql } from "@apollo/client";

export const CARE_PACKAGE_TIME_GET_ALL = gql`
  query carePackageTimeGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: CarePackageTimeFilter!
  ) {
    carePackageTimeGetAll(
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
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CARE_PACKAGE_TIME = gql`
  query getCarePackageTime($id: Float!) {
    carePackageTimeGet(id: $id) {
      id
      title
    }
  }
`;
