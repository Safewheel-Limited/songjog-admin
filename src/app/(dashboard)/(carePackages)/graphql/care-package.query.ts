import { gql } from "@apollo/client";

export const GET_ALL_PERMISSION = gql`
  query permissionGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: PermissionFilter!
  ) {
    permissionGetAll(
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
        name
        createdAt
        updatedAt
        role {
          id
          name
        }
      }
    }
  }
`;
