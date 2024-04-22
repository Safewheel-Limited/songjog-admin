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
      }
    }
  }
`;
