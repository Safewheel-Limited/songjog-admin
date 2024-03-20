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
