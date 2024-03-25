import { gql } from "@apollo/client";

export const GET_ALL_ROLE_ACCESS = gql`
  query roleAccessGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: RoleFilter!
  ) {
    roleAccessGetAll(
      paginationQuery: $paginationQuery
      filterQuery: $filterQuery
    ) {
      status
      message
      pagination {
        page
        limit
        total
        totalPages
      }
      data {
        id
        name
        permission {
          id
          name
        }
        user {
          id
          uid
          phone
          email
          password
          gender
          type
          baseRole
          fullName
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const ROLE_ACCESS_GET_BY_ID = gql`
  query roleAccessGet($id: Int!) {
    roleAccessGet(id: $id) {
      id
      name
      permission {
        id
        name
      }
      user {
        id
        uid
        phone
        email
        password
        gender
        type
        baseRole
        fullName
      }
      createdAt
      updatedAt
    }
  }
`;
