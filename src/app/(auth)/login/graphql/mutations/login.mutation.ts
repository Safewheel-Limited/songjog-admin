import { gql } from "@apollo/client";

// All user mutations
export const ADMIN_LOGIN = gql`
  mutation adminLogin($input: SignInInput!) {
    adminSignIn(signInPayload: $input) {
      accessToken
      refreshToken
      user {
        id
        uid
      }
    }
  }
`;

export const GET_ACCESS_TOKEN = gql`
  mutation adminLogin($token: String!) {
    grantToken(refreshToken: $token)
  }
`;

export const GET_ALL_PERMISSIONS = gql`
  query Permissions {
    permissionGetAll(paginationQuery: {}, filterQuery: {}) {
      message
      data {
        name
        id
        role {
          name
        }
        updatedAt
        createdAt
      }
    }
  }
`;
